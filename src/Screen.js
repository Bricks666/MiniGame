import { ImageLoader } from "./ImageLoader";

class Screen {
  #width;
  #height;
  #canvas;
  #context;
  #images;
  #isLoadedImages;

  constructor({ width = 480, height = 480 }) {
    this.#width = width;
    this.#height = height;

    this.#canvas = this.#createCanvas();
    this.#basicStylingCanvas();

    this.#context = this.#canvas.getContext("2d");

    this.#images = {};
    this.#isLoadedImages = false;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get isLoadedImages() {
    return this.#isLoadedImages;
  }

  #basicStylingCanvas() {
    this.#canvas.style.display = "block";
    this.#canvas.style.margin = "150px auto";
    this.#canvas.width = this.#width;
    this.#canvas.height = this.#height;
  }

  #createCanvas(width, height) {
    let elements = document.getElementsByTagName("canvas");
    let canvas = elements[0] || document.createElement("canvas");
    document.querySelector("body").appendChild(canvas);

    return canvas;
  }

  fill(color) {
    this.#context.fillStyle = color;
    this.#context.fillRect(0, 0, this.#width, this.#height);
  }

  loadImages(images) {
    if (Object.getPrototypeOf(images) !== Object.prototype) {
      throw new SyntaxError(
        "Вы передали неправильный тип данных, метод ожидает объект"
      );
    }

    let loader = new ImageLoader(images);
    loader.load().then(() => {
      this.#images = Object.assign(this.#images, loader.images);
      this.#isLoadedImages = true;
    });
  }

  print(x, y, text) {
    this.#context.fillStyle = "#ffffff";
    this.#context.fillText(text, x, y);
    this.#context.font = "32px Roboto";
  }

  drawImage(x, y, imageName) {
    this.#context.drawImage(this.#images[imageName], x, y);
  }
}

export default Screen;
