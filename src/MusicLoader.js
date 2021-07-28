export class MusicLoader {
  #musicSrc;

  constructor(musicSrc) {
    this.#musicSrc = musicSrc;
  }

  load() {
    return new Promise((resolve, reject) => {
      const music = new Audio();

      music.src = this.#musicSrc;

      music.onloadeddata = () => resolve(music);
      music.onerror = () =>
        reject(
          new Error(
            `Мелодия по адресу ${this.#musicSrc} не была загружена`
          )
        );
    });
  }
}
