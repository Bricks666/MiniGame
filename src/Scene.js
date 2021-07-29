import { ImageLoader } from "./ImageLoader";

class Scene {
  #game;
  #image;
  #status;
  #loaded;

  constructor(game, imageSrc) {
    this.#status = this.constructor.WORKING;
    this.#game = game;
    this.#loaded = true;

    if (Boolean(imageSrc)) {
      this.#loaded = false;
      this.#load(imageSrc);
    }
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

  get image() {
    return this.#image;
  }

  get loaded() {
    return this.#loaded;
  }

  async #load(imageSrc) {
    const loader = new ImageLoader(imageSrc);
    this.#image = await loader.load();
    this.#loaded = true;
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
