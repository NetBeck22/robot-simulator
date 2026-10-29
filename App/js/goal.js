import { Robot } from "./robot.js";

export const GOAL_TYPE = {
  END: "Bereik het eindpunt met je robot!",
  MAX_BLOCKS: "Gebruik niet meer dan 10 blokken!",
  LOOP: "Gebruik minstens 1 lus!",
  VAR: "Maak gebruik van minstens 1 variabele!",
  IF: "Gebruik minstens 1 als of als dan blok!",
  NO_FAULTS: "Zorg dat er geen fout in het programma komt!",
};

/**
 * Goal
 * -------------
 * represents a goal that needs to be full filled in a level
 *
 * Properties
 * ----------------
 * - type : GOAL_TYPE
 * - input : is a number of how much loops, blocks, etc they have to use at least
 * - complete : boolean that is true if the goal is reached
 * - message : the message  for this goal
 *
 * Methods
 * ----------------
 * - getDone() : returns the boolean complete
 * - setDone() : sets the boolean complete
 * - getMessage() : returns the message
 * - setGoalVisible(i) : sets the goal in the page by an index that is given
 * - testGoal(blocks, robot, feedback) : test goal by their type
 */
export class Goal {
  #_type;
  #_input;
  #_complete;
  #_message;

  constructor(type, input = null) {
    this.#_type = type;
    this.#_input = input;
    this.#_complete = false;
    this.#setMessage();
  }

  getDone() {
    return this.#_complete;
  }

  setDone(bool) {
    this.#_complete = bool;
  }

  getMessage() {
    return this.#_message;
  }

  setGoalVisible(i) {
    document.getElementById("goal" + i).innerHTML = this.#_message;
    document.getElementById("goalsDiv" + i).style.display = "flex";
    if (this.#_complete) {
      document.getElementById("check" + i).style.display = "block";
    } else {
      document.getElementById("check" + i).style.display = "none";
    }
  }

  testGoal(blocks, robot, feedback) {
    var test;
    switch (this.#_type) {
      case GOAL_TYPE.END:
        test = robot.testEndPosition();
        break;
      case GOAL_TYPE.LOOP:
        test = this.#testLoops(blocks);
        break;
      case GOAL_TYPE.MAX_BLOCKS:
        test = this.#testBlocks(blocks);
        break;
      case GOAL_TYPE.VAR:
        test = this.#testVar(blocks);
        break;
      case GOAL_TYPE.IF:
        test = this.#testIf(blocks);
        break;
      case GOAL_TYPE.NO_FAULTS:
        test = feedback.getFeedback() == "";
        break;
    }

    this.#_complete = test;
  }

  #setMessage() {
    switch (this.#_type) {
      case GOAL_TYPE.END:
        this.#_message = this.#_type;
        break;
      case GOAL_TYPE.LOOP:
        this.#_message =
          this.#_input > 1
            ? "Gebruik minstens " + this.#_input + " lussen!"
            : this.#_type;
        break;
      case GOAL_TYPE.MAX_BLOCKS:
        this.#_message = "Gebruik niet meer dan " + this.#_input + " blokken!";
        break;
      case GOAL_TYPE.VAR:
        this.#_message =
          this.#_input > 1
            ? "Maak gebruik van minstens " + this.#_input + " variabelen!"
            : this.#_type;
        break;
      case GOAL_TYPE.IF:
        this.#_message =
          this.#_input > 1
            ? "Maak gebruik van minstens " +
              this.#_input +
              " als of als dan blokken!"
            : this.#_type;
        break;
      case GOAL_TYPE.NO_FAULTS:
        this.#_message = this.#_type;
        break;
    }
  }

  #testBlocks(blocks) {
    return blocks.length <= this.#_input;
  }

  #testLoops(blocks) {
    var count = 0;
    blocks.forEach((element) => {
      if (element.type == "whileBlock" || element.type == "forBlock") {
        count++;
      }
    });
    return count >= this.#_input;
  }

  #testVar(blocks) {
    var count = 0;
    blocks.forEach((element) => {
      if (element.type == "variables_set" || element.type == "math_change") {
        count++;
      }
    });
    return count >= this.#_input;
  }

  #testIf(blocks) {
    var count = 0;
    blocks.forEach((element) => {
      if (element.type == "ifBlock" || element.type == "ifElse") {
        count++;
      }
    });
    return count >= this.#_input;
  }
}
