import { Robot } from "./robot.js";
import { X, Y } from "./levelAttribute.js";
import { Goal } from "./goal.js";
import testBlocksLevel1 from "../json/testBlocksLevel1.json" assert { type: "json" };
import testBlocksLevel3 from "../json/testBlocksLevel3.json" assert { type: "json" };
import testBlocksLevel2 from "../json/testBlocksLevel2.json" assert { type: "json" };
import testBlocksLevel4 from "../json/testBlocksLevel4.json" assert { type: "json" };
import faultBlocksLevel1 from "../json/faultBlocksLevel1.json" assert { type: "json" };

/**
 * Level
 * ----------------
 * structure that holds everything for a level
 *
 * Properties
 * -----------------------------------
 * - levelNumber : the number of the level
 * - robot : the robot object for this level
 * - attributes : list of attribute objects in this level
 * - goals : list of goal objects
 * - levelTitle : the title
 * - complete : boolean that is true if every goal is completed in one programme
 * - testBlocks : test blocks that will be loaded if you open this level
 *
 * Methods
 * ----------------------------------------
 * - getRobot() : returns the robot
 * - setStar() : sets the star next to the title if its completed
 * - setTitle() : sets the title in the webpage
 * - setGoals() : sets the goals in the webpage
 * - setUp(workspace) : is called when the level begins to set everything up for this level
 * - getComplete() : returns boolean complete
 * - drawAttributes(context) : draw all attributes for this level, context is for drawing
 * - drawGrid(w, h, context) : draw grid for the level, context for drawing and width and height of the levelCanvas
 * - setGoalsFalse() : set every goal to false at begin from a run or debug
 * - testGoals(blocks, feedback) : calls for every goal its test function, blocks and feedback will be passed to the test funtion
 */
export class Level {
  #_levelNumber = Int16Array;
  #_robotLevel = Robot;
  #_attributes = Array;
  #_goals = Array;
  #_levelTitle = "";
  #_complete = false;
  #_testBlocks;

  constructor(robot, attributes, goals, number, title, testblocks = null) {
    this.#_robotLevel = robot;
    this.#_robotLevel.setObstacles(attributes);
    this.#_attributes = attributes;
    this.#_goals = goals;
    this.#_levelNumber = number;
    this.#_levelTitle = title;
    this.#_testBlocks = testblocks;
  }

  getRobot() {
    return this.#_robotLevel;
  }

  setStar() {
    if (this.#_complete) {
      document.getElementById("levelStar" + this.#_levelNumber).style.display =
        "inline-block";
    }
  }

  setTitle() {
    document.getElementById("levelTitle").innerHTML =
      "Level " + this.#_levelNumber + " : " + this.#_levelTitle;
  }

  setGoals() {
    for (let i = 0; i <= this.#_goals.length; i++) {
      if (this.#_goals[i]) this.#_goals[i].setGoalVisible(i + 1);
    }
  }

  setUp(workspace) {
    for (let i = 1; i < 5; i++) {
      document.getElementById("goal" + i).innerHTML = "";
      document.getElementById("check" + i).style.display = "none";
    }
    this.setGoalsFalse();
    for (let i = this.#_goals.length + 1; i <= 5; i++) {
      document.getElementById("goal" + i).innerHTML = "";
      document.getElementById("check" + i).style.display = "none";
      document.getElementById("goalsDiv" + i).style.display = "none";
    }

    if (this.#_testBlocks != null) {
      Blockly.serialization.workspaces.load(this.#_testBlocks, workspace);
    } else {
      workspace.clear();
    }

    this.setTitle();
  }

  getComplete() {
    return this.#_complete;
  }

  drawAttributes(context) {
    this.#_robotLevel.drawBegin(context);
    this.#_robotLevel.drawEnd(context);
    this.#_robotLevel.draw(context);

    for (let i = 0; i < this.#_attributes.length; i++) {
      this.#_attributes[i].draw(context);
    }
  }

  drawGrid(w, h, context) {
    context.canvas.width = w;
    context.canvas.height = h;

    for (let x = 0; x <= w - 10; x += this.#_robotLevel.getHeight()) {
      context.moveTo(x + 10, 10);
      context.lineTo(x + 10, h - 10);
    }
    for (let y = 0; y <= h - 10; y += this.#_robotLevel.getHeight()) {
      context.moveTo(10, y + 10);
      context.lineTo(w - 10, y + 10);
    }
    context.strokeStyle = "#d3d3d3";
    context.stroke();
  }

  async setGoalsFalse() {
    for (let i = 0; i <= this.#_goals.length; i++) {
      if (this.#_goals[i]) {
        await this.#_goals[i].setDone(false);
        this.#_goals[i].setGoalVisible(i + 1);
      }
    }
  }

  testGoals(blocks, feedback) {
    this.#_goals.forEach((element) => {
      element.testGoal(blocks, this.#_robotLevel, feedback);
    });
    this.setGoals();
    this.#testComplete();
  }

  #testComplete() {
    var done = true;
    this.#_goals.forEach((element) => {
      if (element.getDone() != true) {
        done = false;
      }
    });
    if (done) {
      this.#_complete = true;
    }
  }
}
