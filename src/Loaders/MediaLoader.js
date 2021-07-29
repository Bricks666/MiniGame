export class MediaLoader {
  #mediaSrc;

  constructor(mediaSrc) {
    this.#mediaSrc = mediaSrc;
  }

  load(MediaConstructor) {
    return new Promise((resolve, reject) => {
      const media = new MediaConstructor();

      media.src = this.#mediaSrc;

      if (media instanceof Image) {
        media.onload = () => resolve(media);
      } else if (media instanceof Audio) {
        media.onloadeddata = () => resolve(media);
      } else {
        throw new TypeError(
          "Переданн неправильный тип данных, ожидает аудио или изображение"
        );
      }

      media.onerror = () =>
        reject(
          new ReferenceError(
            `Не удалось загрузить медиа по адресу ${this.#mediaSrc}`
          )
        );
    });
  }
}
