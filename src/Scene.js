class Scene {
  #game;
  _status;

  constructor(game) {
    this.#game = game;
    this._status = this.constructor.WORKING;
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
    return this._status;
  }

  get game() {
    return this.#game;
  }

  init() {
    this._status = this.constructor.WORKING;
  }

  render() {}
}

export default Scene;
