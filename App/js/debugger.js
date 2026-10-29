import { Level } from "./level.js";
import { levelAttribute, ATTRIBUTE_TYPE } from "./levelAttribute.js";
import { toolbox } from "./toolBox.js";
import { Generator } from "./generator.js";
import { Robot } from "./robot.js";

import { Goal, GOAL_TYPE } from "./goal.js";
import { Feedback, FEEDBACK_TYPE } from "./feedback.js";

/**
 * Debugger
 * --------------------
 * debugger controls the run and debug system
 *
 * Properties
 * --------------------
 * - workspace : workspace from blockly to get all the blocks
 * - levels : list of levels from the game
 * - generator: to get all the code, message, feedback when debugging
 * - run : a boolean that is true if you can run, set to false if the user wants it to stop
 * - feedback : a class with all current feedback
 * - current level : index from the levels list, of the current level that is played by the user
 *
 * Methods
 * ------------------------
 * - setCurrentLevel(number) : changes the current level
 * - getCurrentLevel() : returns the current level
 * - setStars() : set the starts from the levels
 * - startDebug() : starts the debugMode and makes a blocktree and generator
 * - setStep() : evals the next block and gets the code and message from the generator
 * - stopRun() : stops the run by setting run boolean to false
 * - startRun() : starts to run all the blocks
 */
export class Debugger {
  #_workspace;
  #_levels = new Array();
  #_generator;
  #_run = true;
  #_feedback;
  #_currentLevel = 0;

  constructor(levels) {
    this.#setUpWorkspace();
    this.#_levels = levels;
    this.getCurrentLevel().setUp(this.#_workspace);
    this.#_generator = null;
    this.#_run = true;
    this.#_feedback = new Feedback();
  }

  setCurrentLevel(levelNumber) {
    this.#_currentLevel = levelNumber;
    this.getCurrentLevel().setUp(this.#_workspace);
  }

  getCurrentLevel() {
    return this.#_levels[this.#_currentLevel];
  }

  setStars() {
    this.#_levels.forEach((element) => {
      element.setStar();
    });
  }

  startDebug() {
    Blockly.JavaScript.init(this.#_workspace);
    this.#_generator = new Generator(
      Blockly.getMainWorkspace().getTopBlocks(true)
    );
    this.getCurrentLevel().setGoalsFalse();
    this.#_feedback.emptyList();
  }

  setStep() {
    var code = this.#_generator.getCodeForNextBlock(this.#_feedback);

    if (code) {
      eval(
        "const delay = ms => new Promise(res => setTimeout(res, ms)); const code = async() => {" +
          code +
          "\n}\n code();"
      );

      this.#_generator.getMessageForNextBlock();
      return true;
    } else {
      this.getCurrentLevel().testGoals(
        this.#_workspace.getAllBlocks(),
        this.#_feedback
      );
      return null;
    }
  }

  stopRun() {
    this.#_run = false;
  }

  async startRun() {
    this.#_run = true;
    this.getCurrentLevel().setGoalsFalse();
    this.#_feedback.emptyList();
    const jsCode = Blockly.JavaScript.workspaceToCode(this.#_workspace);

    await eval(
      "const delay = ms => new Promise(res => setTimeout(res, ms)); const code = async() => {" +
        jsCode +
        "\n}\n code();"
    );

    this.getCurrentLevel().testGoals(
      this.#_workspace.getAllBlocks(),
      this.#_feedback
    );
    return this.#_feedback.getFeedback();
  }

  #highlightBlock(id) {
    this.#_workspace.highlightBlock(id);
  }

  #setUpWorkspace() {
    this.#_workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
      grid: {
        spacing: 20,
        length: 3,
        colour: "#ccc",
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.8,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true,
      },
      trashcan: true,
      maxInstances: { start: 1 },
    });

    Blockly.JavaScript.STATEMENT_PREFIX =
      "this.#highlightBlock(%1);await delay(100);if(this.#_run){\n";
    Blockly.JavaScript.STATEMENT_SUFFIX = "\n}\n";
    Blockly.JavaScript.addReservedWords("highlightBlock");
  }
}
