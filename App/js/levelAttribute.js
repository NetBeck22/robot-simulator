export const X = 0;
export const Y = 1;
export const ATTRIBUTE_TYPE = {
  ROBOT: "robot",
  TREE: "tree",
  WALL: "wall",
};

/**
 * levelAttribute
 * ----------------------
 * An attribute in a level
 *
 * Properties
 * ---------------------
 * - position : coordinates for the position on the canvas
 * - heightWidth : the size
 * - type : tree, wall or robot
 *
 * Methods
 * -----------------------
 * getPositionX() : returns the x coor of this attribute
 * getPositionY() : returns the y coor of this attribute
 * getHeight() : returns the height
 * setPositionX(x) : change the x coor
 * setPositionY(y) : change the y coor
 * draw(context) : draws the attribute at the canvas, context needed for drawing
 */
export class levelAttribute {
  #_position = [0, 0];
  #_heightWidth = 100;
  #_type = ATTRIBUTE_TYPE;

  constructor(beginPos = [0, 0], heightWidth = 100, type) {
    this.#_position[X] = beginPos[X] + 10;
    this.#_position[Y] = beginPos[Y] + 10;
    this.#_heightWidth = heightWidth;
    this.#_type = type;
  }

  getPositionX() {
    return this.#_position[X];
  }

  getPositionY() {
    return this.#_position[Y];
  }

  getHeight() {
    return this.#_heightWidth;
  }

  setPositionX(x) {
    this.#_position[X] = x;
  }
  setPositionY(y) {
    this.#_position[Y] = y;
  }

  draw(context) {
    const img = new Image();
    img.src = "././img/" + this.#_type + ".png";

    context.drawImage(
      img,
      this.#_position[X],
      this.#_position[Y],
      this.#_heightWidth,
      this.#_heightWidth
    );
  }
}
