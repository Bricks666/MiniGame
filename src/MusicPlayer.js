import { MusicLoader } from "./MusicLoader";

export class MusicPlayer {
  #music;
  #isMusicLoaded;
  #intervalSetVolumeId;
  static Volume = 0.25;

  constructor(musicSrc) {
    this.#isMusicLoaded = false;
    this.#load(musicSrc);
    this.#intervalSetVolumeId = 0;
  }

  get isStopped() {
    return this.#music.paused;
  }
  get isMusicLoaded() {
    return this.#isMusicLoaded;
  }

  #load(musicSrc) {
    const loader = new MusicLoader(musicSrc);

    loader.load().then((music) => {
      this.#music = music;
      this.#isMusicLoaded = true;
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
