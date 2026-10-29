export const BLOCK_TYPE = {
  START: "start",
  CHANGE_VARIABELE: "change",
  VARIABELE: "var",
  WHILE: "while",
  FOR: "for",
  ELSE: "else",
  IF: "if",
  IF_ELSE: "if_else",
  LEFT: "left",
  RIGHT: "right",
  UP: "up",
  DOWN: "down",
};

/** Scope
 * ----------
 * Holds list with children in the scope from an ASTBlock
 *
 * Properties
 * ------------------
 * - children : list of ast blocks
 */
export class Scope {
  #_children;

  constructor() {
    this.#_children = new Array();
  }

  getLengthChild() {
    return this.#_children.length;
  }
  getChild(i) {
    return this.#_children[i];
  }
  addChild(child) {
    this.#_children.push(child);
  }
}

/**
 * ASTBlock
 * ----------------
 * Structure for a block in the AST tree
 *
 * Properties
 * -----------------
 * - id : block id from workspace
 * - type : BLOCK_TYPE
 * - code : the code behind the block
 * - message : string that tells what will happen if the block runs
 * - input : this can be a boolean, string or number if there is not an input it is null
 * - scope : blocks with a scope have a Scope object for their children, for other blocks this is null
 * - parent : this is the id of the AST block they are in
 * (ex: if a move block is in the scope of start, the id of start will be the parent of the move block)
 * - elseBlock : AST block of type else, this is only for an if else block
 */
export class ASTBlock {
  static _id;
  static _type;
  static _code;
  static _message;
  static _input;
  _scope;
  _parent;
  _elseBlock;

  constructor(
    id,
    type,
    code,
    message,
    input = null,
    scope = null,
    parent = null,
    elseBlock = null
  ) {
    this._id = id;
    this._type = type;
    this._code = code;
    this._message = message;
    this._input = input;
    this._scope = scope;
    this._parent = parent;
    this._elseBlock = elseBlock;
  }
}

/**
 * VariableBlock
 * -----------------
 * holds the name and value of the variables in the workspace
 */
export class VariableBlock {
  static _name;
  _value;
  constructor(name, value) {
    this._name = name;
    this._value = value;
  }

  changeValue(i) {
    if (typeof this._value != "string" && typeof this._value != "boolean") {
      this._value += i;
    } else {
      return false;
    }
  }
}

/**-----------functions for creating ASTBlocks--------------- */

export function createDoBlock(child, input, parent, code, type, direction) {
  return new ASTBlock(
    child.id,
    type,
    code,
    "De robot gaat " +
      input +
      (input == 1 ? " stap" : " stappen") +
      " naar " +
      direction +
      " !",
    null,
    null,
    parent,
    null,
    null
  );
}

export function createForBlock(child, code, times, parent) {
  return new ASTBlock(
    child.id,
    BLOCK_TYPE.FOR,
    code,
    "Deze loop wordt " + String(times) + " keren uitgevoerd!",
    times,
    new Scope(),
    parent,
    null
  );
}

export function createWhileBlock(child, code, input, parent, condition) {
  return new ASTBlock(
    child.id,
    BLOCK_TYPE.WHILE,
    code,
    "Deze loop wordt uitgevoerd zolang " + condition + " waar is.",
    input,
    new Scope(),
    parent
  );
}

export function createIfBlock(child, code, input, parent, condition) {
  return new ASTBlock(
    child.id,
    BLOCK_TYPE.IF,
    code,
    "Als " + condition + " waar is dan voeren we het volgende uit",
    input,
    new Scope(),
    parent,
    null
  );
}

export function createIfElseBlock(child, code, input, parent, condition) {
  return new ASTBlock(
    child.id,
    BLOCK_TYPE.IF_ELSE,
    code,
    "Als " +
      condition +
      " waar is dan voeren we de eerste blokken uit bij als, anders de tweede blokken bij anders",
    input,
    new Scope(),
    parent,
    new ASTBlock(
      child.id,
      BLOCK_TYPE.ELSE,
      code,
      "Als " +
        condition +
        " waar is dan voeren we de eerste blokken uit bij als, anders de tweede blokken bij anders",
      null,
      new Scope(),
      parent,
      null
    )
  );
}

export function createVariabeleBlock(child, code, name, value, parent) {
  return new ASTBlock(
    child.id,
    BLOCK_TYPE.VARIABELE,
    code,
    "De variable " + name + " heeft de waarde " + value,
    value,
    null,
    parent
  );
}

export function createChangeVarBlock(
  child,
  code,
  parent,
  varName,
  changeValue
) {
  return new ASTBlock(
    child.id,
    BLOCK_TYPE.CHANGE_VARIABELE,
    code,
    "De variable " + varName + " wordt verandert met " + changeValue,
    null,
    null,
    parent,
    null
  );
}
