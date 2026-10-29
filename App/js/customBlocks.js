Blockly.Blocks["start"] = {
  init: function () {
    this.appendStatementInput("VALUE").setCheck(null).appendField("Start");
    this.setColour(300);
    this.setTooltip("Startblok, hier begint je code!");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["start"] = function (block) {
  var statements_value = Blockly.JavaScript.statementToCode(block, "VALUE");
  var code =
    "this.getCurrentLevel().getRobot().setRobotBegin(); await delay(500);" +
    statements_value;
  return code;
};

//custom block right
Blockly.Blocks["moveRight"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Rechts")
      .appendField(new Blockly.FieldNumber(1), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("Beweeg een aantal vakje(s) rechts met de robot!");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["moveRight"] = function (block) {
  var number_value = block.getFieldValue("VALUE");
  var code =
    "for(let i = 0; i < " +
    number_value +
    "; i++){if(this.getCurrentLevel().getRobot().moveRight() == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.EDGE);}\n await delay(500);\n} ";
  return code;
};

//custom block left
Blockly.Blocks["moveLeft"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Links")
      .appendField(new Blockly.FieldNumber(1), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("Beweeg een aantal vakje(s) links met de robot!");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["moveLeft"] = function (block) {
  var number_value = block.getFieldValue("VALUE");
  var code =
    "for(let i = 0; i < " +
    number_value +
    "; i++){if(this.getCurrentLevel().getRobot().moveLeft() == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.EDGE);}\n await delay(500);\n} ";
  return code;
};

//custom block up
Blockly.Blocks["moveUp"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Omhoog")
      .appendField(new Blockly.FieldNumber(1), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("Beweeg een aantal vakje(s) omhoog met de robot!");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["moveUp"] = function (block) {
  var number_value = block.getFieldValue("VALUE");
  var code =
    "for(let i = 0; i < " +
    number_value +
    "; i++){if(this.getCurrentLevel().getRobot().moveUp() == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.EDGE);}\n await delay(500);\n} ";
  return code;
};

//custom block down
Blockly.Blocks["moveDown"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Omlaag")
      .appendField(new Blockly.FieldNumber(1), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("Beweeg een aantal vakje(s) omlaag met de robot!");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["moveDown"] = function (block) {
  var number_value = block.getFieldValue("VALUE");
  var code =
    "for(let i = 0; i < " +
    number_value +
    "; i++){if(this.getCurrentLevel().getRobot().moveDown() == false){this.#_feedback.addFeedback(FEEDBACK_TYPE.EDGE);}\n await delay(500);\n} ";
  return code;
};

//ifBlock
Blockly.Blocks["ifBlock"] = {
  init: function () {
    this.appendValueInput("IF").setCheck("Boolean").appendField("Als");
    this.appendStatementInput("DO").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Als ... waar is voer de volgende blokken uit!");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["ifBlock"] = function (block) {
  var value_if = Blockly.JavaScript.valueToCode(
    block,
    "IF",
    javascript.Order.ATOMIC
  );
  var statements_do = Blockly.JavaScript.statementToCode(block, "DO");
  var code = "if(" + value_if + "){" + statements_do + "}\n";
  return code;
};

Blockly.Blocks["ifElse"] = {
  init: function () {
    this.appendValueInput("IF").setCheck("Boolean").appendField("Als");
    this.appendStatementInput("DO").setCheck(null);
    this.appendStatementInput("ELSE_DO").setCheck(null).appendField("Anders");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip(
      "Als ... waar is voer de volgende blokken uit! Is het niet waar? Anders voeren we deze blokken uit!"
    );
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["ifElse"] = function (block) {
  var value_if = Blockly.JavaScript.valueToCode(
    block,
    "IF",
    javascript.Order.ATOMIC
  );
  var statements_do = Blockly.JavaScript.statementToCode(block, "DO");
  var statements_else = Blockly.JavaScript.statementToCode(block, "ELSE_DO");
  var code =
    "if(" +
    value_if +
    "){" +
    statements_do +
    "}else{" +
    statements_else +
    "}\n";
  return code;
};

//while
Blockly.Blocks["whileBlock"] = {
  init: function () {
    this.appendValueInput("CONDITION")
      .setCheck("Boolean")
      .appendField("Zolang");
    this.appendStatementInput("DO").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Zolang ... waar is gaan we deze blokken uitvoeren!");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["whileBlock"] = function (block) {
  var condition = Blockly.JavaScript.valueToCode(
    block,
    "CONDITION",
    javascript.Order.ATOMIC
  );
  var doCode = Blockly.JavaScript.statementToCode(block, "DO");
  var code =
    "var count = 0;while(" +
    condition +
    "){if(count==10){this.#_feedback.addFeedback(FEEDBACK_TYPE.LOOP);}" +
    doCode +
    "count++;}\n";
  return code;
};

//for block
Blockly.Blocks["forBlock"] = {
  init: function () {
    this.appendValueInput("COUNT").setCheck("Number").appendField("Herhaal");
    this.appendDummyInput();
    this.appendStatementInput("DO").setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Herhaal ... keer deze blokken, bv: 2 keer!");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript.forBlock["forBlock"] = function (block) {
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    "COUNT",
    javascript.Order.ATOMIC
  );
  var statements_do = Blockly.JavaScript.statementToCode(block, "DO");
  var code =
    "if(" +
    value_name +
    ">=10){this.#_feedback.addFeedback(FEEDBACK_TYPE.LOOP);}\nfor(let i = 0; i <" +
    value_name +
    "; i++){" +
    statements_do +
    "}\n";
  return code;
};
