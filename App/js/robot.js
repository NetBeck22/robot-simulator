import { levelAttribute, X, Y } from "./levelAttribute.js";

const CANVAS_WH = 420;

/**
 * Robot
 * ------------------
 *
 * Properties
 * ------------------
 * - obstacles : is a nested list, with for every attribute in the level they are linked to a list of the x and y position and the height
 * - beginPos : represent the start coordinates
 * - endPos : represent the end coordinates, the place the robot has to go to
 *
 * Methods
 * -------------------
 * - setObstacles(obstacles) : sets the list of obstacles
 * - setRobotBegin() : sets robot to his begin place (everytime the startblock calls this function)
 * - getEndPosition() : returns the end coor
 * - testEndPosition() : returns true if robot is at the end
 * - drawBegin(context) : context needed for drawing the startpoint
 * - drawwEnd(context) : context needed for drawing the endpoint
 * - moveLeft(), moveRight(), moveUp(), moveDown() : moves the robot
 */
export class Robot extends levelAttribute {
  #_obstacles = new Array();
  #_beginPos = [0, 0];
  #_endPos = [0, 0];

  constructor(beginPos, endPos, heightWidth, type) {
    super(beginPos, heightWidth, type);
    this.#_beginPos[X] = this.getPositionX();
    this.#_beginPos[Y] = this.getPositionY();
    this.#_endPos[X] = endPos[X] + 10;
    this.#_endPos[Y] = endPos[Y] + 10;
  }

  setObstacles(obstacles) {
    obstacles.forEach((element) => {
      this.#_obstacles.push([
        element.getPositionX(),
        element.getPositionY(),
        element.getHeight(),
      ]);
    });
  }

  setRobotBegin() {
    this.setPositionX(this.#_beginPos[X]);
    this.setPositionY(this.#_beginPos[Y]);
  }

  getEndPosition() {
    return this.#_endPos;
  }

  testEndPosition() {
    if (
      this.#_endPos[X] == this.getPositionX() &&
      this.#_endPos[Y] == this.getPositionY()
    ) {
      return true;
    }
  }

  drawBegin(context) {
    const img = new Image();
    img.src = "././img/gate.png";
    context.drawImage(
      img,
      this.#_beginPos[X],
      this.#_beginPos[Y],
      this.getHeight(),
      this.getHeight()
    );
  }

  drawEnd(context) {
    const img = new Image();
    img.src = "././img/flag.png";
    context.drawImage(
      img,
      this.#_endPos[X],
      this.#_endPos[Y],
      this.getHeight(),
      this.getHeight()
    );
  }

  moveRight() {
    let x =
      (this.getPositionX() + this.getHeight()) % (CANVAS_WH - this.getHeight());
    if (this.#testObstacles(x, this.getPositionY())) {
      this.setPositionX(x);
    } else {
      return false;
    }
  }

  moveLeft() {
    let x =
      (this.getPositionX() - this.getHeight()) % (CANVAS_WH - this.getHeight());
    if (this.#testObstacles(x, this.getPositionY())) {
      this.setPositionX(x);
    } else {
      return false;
    }
  }

  moveUp() {
    let y =
      (this.getPositionY() - this.getHeight()) % (CANVAS_WH - this.getHeight());
    if (this.#testObstacles(this.getPositionX(), y)) {
      this.setPositionY(y);
    } else {
      return false;
    }
  }

  moveDown() {
    let y =
      (this.getPositionY() + this.getHeight()) % (CANVAS_WH - this.getHeight());
    if (this.#testObstacles(this.getPositionX(), y)) {
      this.setPositionY(y);
    } else {
      return false;
    }
  }

  #testObstacles(x, y) {
    for (let i = 0; i < this.#_obstacles.length; i++) {
      if (
        this.#_obstacles[i][X] <= x &&
        x <= this.#_obstacles[i][X] + this.#_obstacles[i][2] &&
        this.#_obstacles[i][Y] <= y &&
        y <= this.#_obstacles[i][Y] + this.#_obstacles[i][2] &&
        this.#_obstacles[i][X] <= x + this.getHeight() &&
        x + this.getHeight() <=
          this.#_obstacles[i][X] + this.#_obstacles[i][2] &&
        this.#_obstacles[i][Y] <= y + this.getHeight() &&
        y + this.getHeight() <= this.#_obstacles[i][Y] + this.#_obstacles[i][2]
      ) {
        return false;
      }
    }

    if (x < this.getHeight() + 10 && x != 10) {
      return false;
    }

    if (y < this.getHeight() + 10 && y != 10) {
      return false;
    }

    return true;
  }
}
