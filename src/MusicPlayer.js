import { MusicLoader } from "./MusicLoader";

export class MusicPlayer {
  #music;
  #intervalSetVolumeId;
  #loaded;
  static Volume = 0.25;

  constructor(musicSrc) {
    this.#load(musicSrc);
    this.#intervalSetVolumeId = 0;
    this.#loaded = false;
  }

  get isStopped() {
    return this.#music.paused;
  }

  get loaded() {
    return this.#loaded;
  }

  #load(musicSrc) {
    const loader = new MusicLoader(musicSrc);

    loader.load().then((music) => {
      this.#music = music;
      this.#loaded = true;
      this.musicSetting();
      console.log("Мелодия загружена");
    });
  }

  musicSetting() {
    this.#music.loop = true;
    this.#music.volume = this.constructor.Volume;
  }

  startPlaying() {
    this.#music.play();
    /* Подумать над оптимизацией конструкции */
    this.#intervalSetVolumeId = setInterval(
      () => (this.#music.volume = this.constructor.Volume),
      1000
    );
  }

  stopPlaying() {
    this.#music.pause();
    clearInterval(this.#intervalSetVolumeId);
    this.#intervalSetVolumeId = 0;
  }
}
