import { ImageLoader } from "./ImageLoader";

class Screen {
  #width;
  #height;
  #canvas;
  #context;

  constructor({ width = 480, height = 480 }) {
    this.#width = width;
    this.#height = height;

    this.#canvas = this.#createCanvas();
    this.#basicStylingCanvas();

    this.#context = this.#canvas.getContext("2d");
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  #basicStylingCanvas() {
    this.#canvas.style.display = "block";
    this.#canvas.style.margin = "150px auto";
    this.#canvas.width = this.#width;
    this.#canvas.height = this.#height;
  }

  #createCanvas(width, height) {
    let canvas = document.createElement("canvas");
    document.querySelector("body").appendChild(canvas);

    return canvas;
  }

  fill(color) {
    this.#context.fillStyle = color;
    this.#context.fillRect(0, 0, this.#width, this.#height);
  }

  print(x, y, text) {
    this.#context.fillStyle = "#ffffff";
    this.#context.fillText(text, x, y);
    this.#context.font = "32px Roboto";
  }

  drawImage(x, y, image) {
    this.#context.drawImage(image, x, y);
  }
}

export default Screen;
