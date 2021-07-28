export class ImageLoader {
  #imageFiles;
  #images;

  constructor(images) {
    this.#imageFiles = images;
    this.#images = {};
  }

  get images() {
    return this.#images;
  }

  load() {
    const promises = [];

    for (let [name, src] of Object.entries(this.#imageFiles)) {
      promises.push(this.#loadImage(name, src));
    }

    return Promise.all(promises);
  }

  #loadImage(name, src) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = src;
      this.#images[name] = image;

      image.onload = resolve;
      image.onerror = () =>
        reject(new Error(`Изображение ${name}  не загружено`));
    });
  }
}
