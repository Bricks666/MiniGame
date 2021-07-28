class Scene {
  #game;
  #image;
  #status;

  constructor(game, imageSrc) {
    this.#status = this.constructor.WORKING;
    this.#game = game;
    this.load(imageSrc);
  }

  static get WORKING() {
    return "WORKING";
  }
  static get LOADED() {
    return "LOADED";
  }
  static get START() {
    return "START";
  }
  static get LOSE() {
    return "LOSE";
  }
  static get WIN() {
    return "WIN";
  }
  static get FINISHED() {
    return "FINISHED";
  }

  get status() {
    return this.#status;
  }

  get game() {
    return this.#game;
  }

  init() {
    this.#status = this.constructor.WORKING;
  }

  render() {}

  finish(status) {
    this.#status = status;
  }
}

export default Scene;
