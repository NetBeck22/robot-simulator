import {
  BLOCK_TYPE,
  Scope,
  ASTBlock,
  VariableBlock,
  createDoBlock,
  createForBlock,
  createWhileBlock,
  createIfBlock,
  createIfElseBlock,
  createVariabeleBlock,
  createChangeVarBlock,
} from "./ASTBlocks.js";

/**
 * Bloktree
 * --------------
 * Structure that holds the structure of the blocks
 *
 * Properties
 * --------------
 * - startBlock : the first block
 * - vars : list of variable blocks in the programmes
 *
 * Methods
 * -------------------
 * - getVarsList() : gives the list of variables in the tree
 * - setVar(name, value) : set a variable in the list with a value
 * - getStartBlock() : returns the start block
 * - evalCode(code) : returns the eval(code) but with all the vars in it
 */
export class BlockTree {
  #_startBlock;
  #_vars;

  constructor(blocks) {
    this.#_vars = new Array();
    this.#makeASTNode(blocks);
  }

  getVarsList() {
    return this.#_vars;
  }

  setVar(name, value) {
    this.#_vars.forEach((element) => {
      if (name == element._name) {
        element._value = value;
        return;
      }
    });
    return;
  }

  getStartBlock() {
    return this.#_startBlock;
  }

  evalCode(code) {
    let codeVar = "";
    this.#_vars.forEach((element) => {
      codeVar += "var " + element._name + "='" + element._value + "';";
    });
    return eval(codeVar + code);
  }

  /** ---- create tree-------- */
  #makeASTNode(blocks) {
    blocks.forEach((element) => {
      var currentBlock;
      if (element.type == "start") {
        currentBlock = this.#_startBlock = new ASTBlock(
          element.id,
          BLOCK_TYPE.START,
          this.#createCode(
            "this.getCurrentLevel().getRobot().setRobotBegin(); await delay(500);\n",
            element.id
          ),
          "We starten de robot op zijn beginpositie... 1,2,3 GO!",
          null,
          new Scope(),
          null,
          null
        );

        this.#createChildren(
          currentBlock,
          element.getChildren(true)[0],
          new Array()
        );
      }
    });
  }

  #createChildren(parent, child, vars) {
    if (!child) {
      return;
    }

    let childBlock = ASTBlock | VariableBlock | null;

    switch (child.type) {
      case "moveRight":
        this.#createRight(childBlock, child, parent, vars);
        break;
      case "moveLeft":
        this.#createLeft(childBlock, child, parent, vars);
        break;
      case "moveUp":
        this.#createUp(childBlock, child, parent, vars);
        break;
      case "moveDown":
        this.#createDown(childBlock, child, parent, vars);
        break;
      case "forBlock":
        this.#createRepeat(childBlock, child, parent, vars);
        break;
      case "whileBlock":
        this.#createWhile(childBlock, child, parent, vars);
        break;
      case "ifBlock":
        this.#createIf(childBlock, child, parent, vars);
        break;
      case "ifElse":
        this.#createIfElse(childBlock, child, parent, vars);
        break;
      case "variables_set":
        this.#createVar(childBlock, child, parent, vars);
        break;
      case "math_change":
        this.#createChange(childBlock, child, parent, vars);
        break;
      default:
        break;
    }
  }

  #createCode(code, id) {
    return "this.#highlightBlock('" + id + "');await delay(100);\n" + code;
  }

  #searchIdVar(name) {
    for (let i = 0; i < this.#_vars.length; i++) {
      if (this.#_vars[i]._name == name) {
        return i;
      }
    }
    return -1;
  }

  /** ------- create Blocks and their children --------------- */

  #createRight(childBlock, child, parent, vars) {
    var input = child.getFieldValue("VALUE");
    childBlock = createDoBlock(
      child,
      input,
      parent,
      this.#createCode(
        "for(let i = 0; i < " +
          input +
          "; i++){if(this.getCurrentLevel().getRobot().moveRight() == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.EDGE);}\n await delay(500);\n} ",
        child.id
      ),
      BLOCK_TYPE.RIGHT,
      "rechts"
    );
    parent._scope?.addChild(childBlock);
    this.#createChildren(parent, child.getChildren(true)[0], vars);
  }

  #createLeft(childBlock, child, parent, vars) {
    var input = child.getFieldValue("VALUE");
    childBlock = createDoBlock(
      child,
      input,
      parent,
      this.#createCode(
        "for(let i = 0; i < " +
          input +
          "; i++){if(this.getCurrentLevel().getRobot().moveLeft() == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.EDGE);}\n await delay(500);\n} ",
        child.id
      ),
      BLOCK_TYPE.LEFT,
      "links"
    );
    parent._scope?.addChild(childBlock);
    this.#createChildren(parent, child.getChildren(true)[0], vars);
  }

  #createUp(childBlock, child, parent, vars) {
    var input = child.getFieldValue("VALUE");
    childBlock = createDoBlock(
      child,
      input,
      parent,
      this.#createCode(
        "for(let i = 0; i < " +
          input +
          "; i++){if(this.getCurrentLevel().getRobot().moveUp() == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.EDGE);}\n await delay(500);\n} ",
        child.id
      ),
      BLOCK_TYPE.UP,
      "omhoog"
    );
    parent._scope?.addChild(childBlock);
    this.#createChildren(parent, child.getChildren(true)[0], vars);
  }

  #createDown(childBlock, child, parent, vars) {
    var input = child.getFieldValue("VALUE");
    childBlock = createDoBlock(
      child,
      input,
      parent,
      this.#createCode(
        "for(let i = 0; i < " +
          input +
          "; i++){if(this.getCurrentLevel().getRobot().moveDown() == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.EDGE);}\n await delay(500);\n} ",
        child.id
      ),
      BLOCK_TYPE.DOWN,
      "omlaag"
    );
    parent._scope?.addChild(childBlock);
    this.#createChildren(parent, child.getChildren(true)[0], vars);
  }

  #createRepeat(childBlock, child, parent, vars) {
    var times = Blockly.JavaScript.valueToCode(
      child,
      "COUNT",
      javascript.Order.ATOMIC
    );

    childBlock = createForBlock(
      child,
      this.#createCode(
        "if(" +
          this.evalCode(times) +
          ">=10){this.#_feedback.addFeedback(FEEDBACK_TYPE.LOOP);}",
        child.id
      ),
      this.evalCode(times),
      parent
    );

    parent._scope?.addChild(childBlock);
    this.#createChildren(childBlock, child.getChildren(true)[1], vars);
    this.#createChildren(parent, child.getChildren(true)[2], vars);
  }

  #createWhile(childBlock, child, parent, vars) {
    childBlock = createWhileBlock(
      child,
      this.#createCode("", child.id),

      Blockly.JavaScript.valueToCode(
        child,
        "CONDITION",
        javascript.Order.ATOMIC
      ),
      parent,
      Blockly.JavaScript.valueToCode(
        child,
        "CONDITION",
        javascript.Order.ATOMIC
      )
    );
    parent._scope?.addChild(childBlock);
    this.#createChildren(childBlock, child.getChildren(true)[1], vars);
    this.#createChildren(parent, child.getChildren(true)[2], vars);
  }

  #createIf(childBlock, child, parent, vars) {
    childBlock = createIfBlock(
      child,
      this.#createCode("", child.id),
      this.evalCode(
        Blockly.JavaScript.valueToCode(child, "IF", javascript.Order.ATOMIC)
      ),
      parent,
      String(
        Blockly.JavaScript.valueToCode(child, "IF", javascript.Order.ATOMIC)
      )
    );
    parent._scope?.addChild(childBlock);
    this.#createChildren(childBlock, child.getChildren(true)[1], vars);
    this.#createChildren(parent, child.getChildren(true)[2], vars);
  }

  #createIfElse(childBlock, child, parent, vars) {
    childBlock = createIfElseBlock(
      child,
      this.#createCode("", child.id),
      this.evalCode(
        Blockly.JavaScript.valueToCode(child, "IF", javascript.Order.ATOMIC)
      ),
      parent,
      String(
        Blockly.JavaScript.valueToCode(child, "IF", javascript.Order.ATOMIC)
      )
    );
    parent._scope?.addChild(childBlock);
    this.#createChildren(childBlock, child.getChildren(true)[1], vars);
    this.#createChildren(
      childBlock._elseBlock,
      child.getChildren(true)[2],
      vars
    );
    this.#createChildren(parent, child.getChildren(true)[3], vars);
  }

  #createVar(childBlock, child, parent, vars) {
    var name = Blockly.JavaScript.nameDB_.getName(
      child.getFieldValue("VAR"),
      Blockly.Names.NameType.VARIABLE
    );

    var value = this.evalCode(
      Blockly.JavaScript.valueToCode(child, "VALUE", javascript.Order.ATOMIC)
    );

    var code;
    if (typeof value == "number" || typeof value == "boolean") {
      code = this.#createCode(
        "this.#_generator.getBlockTree().setVar('" + name + "'," + value + ");",
        child.id
      );
    } else {
      code = this.#createCode(
        "this.#_generator.getBlockTree().setVar('" +
          name +
          "','" +
          value +
          "');",
        child.id
      );
    }

    var index = this.#searchIdVar(name, vars);
    if (index != -1) {
      vars[index] = value;
    } else {
      vars.push(value);
      this.#_vars.push(new VariableBlock(name, value));
    }

    childBlock = createVariabeleBlock(child, code, name, value, parent);
    parent._scope?.addChild(childBlock);
    this.#createChildren(parent, child.getChildren(true)[1], vars);
  }

  #createChange(childBlock, child, parent, vars) {
    var name = Blockly.JavaScript.nameDB_.getName(
      child.getFieldValue("VAR"),
      Blockly.Names.NameType.VARIABLE
    );
    var value = this.evalCode(
      Blockly.JavaScript.valueToCode(child, "DELTA", javascript.Order.ATOMIC)
    );

    vars[this.#searchIdVar(name)] += eval(
      Blockly.JavaScript.valueToCode(child, "DELTA", javascript.Order.ATOMIC)
    );

    childBlock = createChangeVarBlock(
      child,
      this.#createCode(
        "var test = this.#_generator.getBlockTree().getVarsList()[" +
          this.#searchIdVar(name) +
          "].changeValue(" +
          value +
          "); if(test == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.VAR);}\n",
        child.id
      ),
      parent,
      name,
      value
    );
    parent._scope?.addChild(childBlock);
    this.#createChildren(parent, child.getChildren(true)[1], vars);
  }
}
