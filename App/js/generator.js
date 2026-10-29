import { ASTBlock, BLOCK_TYPE } from "./ASTBlocks.js";
import { BlockTree } from "./blockTree.js";
import { FEEDBACK_TYPE } from "./feedback.js";

/** Generator
 * ------------------------
 * generates code and messages for the step by step debugger
 * by reading the blocktree
 *
 * Properties:
 * --------------------------
 * - blocktree : to know the structure and all the informations of the blocks
 * - blockIndex : to know where in the current scope we are
 * - currentBlock : the block we are currently debugging
 * - currentScope: the parent of the block we are debugging
 * - loopCount : counts how many times the current loop is called or how many times their are left to call the loop
 *
 * Methods
 * --------------------------
 * - getBlockTree() : returns the tree
 * - getMessageForNextBlock() : sets the message for the next block and decreases the index
 * - getCodeForNextBlock() : returns a string of code for the next block
 */
export class Generator {
  #_blockTree = BlockTree;
  #_blockIndex = Int16Array;
  #_currentBlock = ASTBlock;
  #_currentScope = ASTBlock;
  #_loopCount = Int16Array;

  constructor(blocks) {
    this.#_blockTree = new BlockTree(blocks);
    this.#_blockIndex = 0;
    this.#_blockIndex = 0;
    this.#_currentScope = this.#_blockTree.getStartBlock();
    this.#_loopCount = -1;
  }

  getBlockTree() {
    return this.#_blockTree;
  }

  getMessageForNextBlock() {
    document.getElementById("debug").innerHTML = this.#_currentBlock._message;
    if (this.#_blockTree.getVarsList().length > 0) {
      var code = "";
      this.#_blockTree.getVarsList().forEach((element) => {
        code += element._name + " = " + element._value + "<br>";
      });
      document.getElementById("debugVarsDiv").style.display = "block";
      document.getElementById("debugVars").innerHTML = code;
    }
    this.#_blockIndex++;
  }

  getCodeForNextBlock(feedback) {
    if (this.#_currentScope._scope != null) {
      if (this.#_blockIndex > this.#_currentScope._scope?.getLengthChild()) {
        if (
          this.#_currentScope._type == BLOCK_TYPE.FOR &&
          this.#_loopCount > 0
        ) {
          this.#setScopeAgain();
          return this.getCodeForNextBlock(feedback);
        } else if (
          this.#_currentScope._type == BLOCK_TYPE.WHILE &&
          this.#_blockTree.evalCode(this.#_currentScope._input)
        ) {
          this.#_blockIndex = 0;
          this.#_loopCount++;
          this.#_currentBlock = this.#_currentScope;
          if (this.#_loopCount == 10) {
            feedback.addFeedback(FEEDBACK_TYPE.LOOP);
          }
          return this.getCodeForNextBlock(feedback);
        } else {
          return this.#endOfScope(feedback);
        }
      } else {
        this.#setCurrentBlock();
        this.#checkForNewScope();
        return this.#_currentBlock._code;
      }
    }
  }

  #searchNext(parent, scope) {
    let next = null;
    for (let i = 0; i < parent._scope?.getLengthChild(); i++) {
      if (parent._scope?.getChild(i)._id == scope._id) {
        next = i + 2;
      }
    }
    if (next == null && parent._parent != null) {
      return this.#searchNext(parent._parent, parent);
    }

    return next;
  }

  #endOfScope(feedback) {
    if (this.#_currentScope._parent != null) {
      this.#_blockIndex = this.#searchNext(
        this.#_currentScope._parent,
        this.#_currentScope
      );
      if (this.#_blockIndex == null) {
        return null;
      }
      this.#_currentScope = this.#_currentScope._parent;
      return this.getCodeForNextBlock(feedback);
    } else {
      return null;
    }
  }

  #setScopeAgain() {
    this.#_loopCount--;
    this.#_currentBlock = this.#_currentScope;
    this.#_blockIndex = 0;
  }

  #setCurrentBlock() {
    if (this.#_blockIndex == 0) {
      this.#_currentBlock = this.#_currentScope;
    } else {
      if (this.#_currentScope._scope?.getChild(this.#_blockIndex - 1))
        this.#_currentBlock = this.#_currentScope._scope?.getChild(
          this.#_blockIndex - 1
        );
    }
  }

  #checkForNewScope() {
    if (this.#_currentBlock._type == BLOCK_TYPE.FOR) {
      if (this.#_currentScope != this.#_currentBlock) {
        this.#setNewScopeForLoop();
      }
    } else if (
      (this.#_currentBlock._type == BLOCK_TYPE.IF ||
        this.#_currentBlock._type == BLOCK_TYPE.IF_ELSE) &&
      this.#_currentBlock._input
    ) {
      this.#_currentScope = this.#_currentBlock;
      this.#_blockIndex = 0;
    } else if (
      this.#_currentBlock._type == BLOCK_TYPE.IF_ELSE &&
      !this.#_currentBlock._input
    ) {
      this.#_currentScope = this.#_currentBlock._elseBlock;
      this.#_blockIndex = 0;
    } else if (this.#_currentBlock._type == BLOCK_TYPE.WHILE) {
      if (this.#_currentScope != this.#_currentBlock) {
        this.#_loopCount = 0;
      }
      this.#_currentScope = this.#_currentBlock;
      this.#_blockIndex = 0;
    }
  }

  #setNewScopeForLoop() {
    this.#_currentScope = this.#_currentBlock;
    this.#_blockIndex = 0;
    this.#_loopCount = Number(this.#_currentScope._input) - 1;
  }
}
