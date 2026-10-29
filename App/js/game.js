import { Debugger } from "./debugger.js";
import { Robot } from "./robot.js";
import { levelAttribute, ATTRIBUTE_TYPE } from "./levelAttribute.js";
import { Level } from "./level.js";
import { Goal, GOAL_TYPE } from "./goal.js";
import testBlocksLevel1 from "../json/testBlocksLevel1.json" with { type: "json" };
import testBlocksLevel3 from "../json/testBlocksLevel3.json" with { type: "json" };
import testBlocksLevel2 from "../json/testBlocksLevel2.json" with { type: "json" };
import testBlocksLevel4 from "../json/testBlocksLevel4.json" with { type: "json" };
import faultBlocksLevel1 from "../json/faultBlocksLevel1.json" with { type: "json" };

/**
 * Game
 * -----------
 * holds the debugger and the canvas and context
 * creates levels to give to the debugger
 */
export class Game {
  #_canvas;
  #_context;
  #_debugger;

  constructor() {
    this.#setUpCanvas();
    var levels = new Array();
    this.#setUpLevels(levels);
    this.#_debugger = new Debugger(levels);
  }

  getDebugger() {
    return this.#_debugger;
  }

  getContext() {
    return this.#_context;
  }

  getCanvas() {
    return this.#_canvas;
  }
  #setUpCanvas() {
    this.#_canvas = document.getElementById("levelCanvas");
    this.#_context = this.#_canvas.getContext("2d");
  }

  #setUpLevels(levels) {
    this.#setUpLevel1(levels);
    this.#setUpLevel2(levels);
    this.#setUpLevel3(levels);
    this.#setUpLevel4(levels);
  }

  #setUpLevel1(levels) {
    levels.push(
      new Level(
        new Robot([200, 200], [300, 0], 100, ATTRIBUTE_TYPE.ROBOT),
        [
          new levelAttribute([100, 100], 100, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([200, 100], 100, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 100], 100, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([100, 200], 100, ATTRIBUTE_TYPE.WALL),
        ],
        [new Goal(GOAL_TYPE.END), new Goal(GOAL_TYPE.NO_FAULTS)],
        1,
        "Mijn eerste programma",
        testBlocksLevel1
      )
    );
  }

  #setUpLevel2(levels) {
    levels.push(
      new Level(
        new Robot([250, 150], [50, 50], 50, ATTRIBUTE_TYPE.ROBOT),
        [
          new levelAttribute([50, 100], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([300, 250], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([300, 200], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([300, 150], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([300, 100], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([250, 100], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([200, 100], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([200, 150], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([200, 200], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([150, 200], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([100, 150], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([100, 100], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([100, 200], 50, ATTRIBUTE_TYPE.TREE),
        ],
        [
          new Goal(GOAL_TYPE.END),
          new Goal(GOAL_TYPE.LOOP, 1),
          new Goal(GOAL_TYPE.NO_FAULTS),
        ],
        2,
        "Doolhof",
        testBlocksLevel2
      )
    );
  }

  #setUpLevel3(levels) {
    levels.push(
      new Level(
        new Robot([0, 0], [200, 150], 50, ATTRIBUTE_TYPE.ROBOT),
        [
          new levelAttribute([50, 0], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([50, 50], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([50, 100], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([50, 150], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([50, 200], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([50, 250], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([50, 300], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([100, 300], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([150, 300], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([200, 300], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([250, 300], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 300], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 50], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 100], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 150], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 200], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 250], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([150, 50], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([200, 50], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([250, 50], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([150, 100], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([150, 150], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([150, 200], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([200, 200], 50, ATTRIBUTE_TYPE.WALL),
        ],
        [
          new Goal(GOAL_TYPE.END),
          new Goal(GOAL_TYPE.LOOP, 2),
          new Goal(GOAL_TYPE.MAX_BLOCKS, 20),
          new Goal(GOAL_TYPE.VAR, 1),
          new Goal(GOAL_TYPE.NO_FAULTS),
        ],
        3,
        "Loops doolhof",
        testBlocksLevel3
      )
    );
  }

  #setUpLevel4(levels) {
    levels.push(
      new Level(
        new Robot([50, 50], [200, 250], 50, ATTRIBUTE_TYPE.ROBOT),
        [
          new levelAttribute([0, 0], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([0, 50], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([0, 100], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([50, 0], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([50, 200], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([50, 250], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([50, 300], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([100, 0], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([100, 50], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([100, 100], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([100, 150], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([150, 250], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([150, 300], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([150, 350], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([200, 50], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([200, 100], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([200, 200], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([200, 350], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([250, 50], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([250, 200], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([250, 250], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([250, 350], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([300, 50], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 100], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 150], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 200], 50, ATTRIBUTE_TYPE.WALL),
          new levelAttribute([300, 350], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([350, 300], 50, ATTRIBUTE_TYPE.TREE),
          new levelAttribute([350, 350], 50, ATTRIBUTE_TYPE.TREE),
        ],
        [
          new Goal(GOAL_TYPE.END),
          new Goal(GOAL_TYPE.NO_FAULTS),
          new Goal(GOAL_TYPE.IF, 1),
          new Goal(GOAL_TYPE.LOOP, 1),
          new Goal(GOAL_TYPE.MAX_BLOCKS, 30),
        ],
        4,
        "Experts doolhof",
        testBlocksLevel4
      )
    );
  }
}
