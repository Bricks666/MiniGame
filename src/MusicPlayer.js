export class MusicPlayer {
  #currentMusic;
  #volume;

  constructor(volume = 0.25) {
    this.#currentMusic = null;
    this.#volume = volume;
  }

  get isMusicPlaying() {
    return !this.#currentMusic?.paused;
  }

  changePlayingMusic(music) {
    this.stopMusic();
    this.#currentMusic = music;
    if (Boolean(this.#currentMusic)) {
      this.#currentMusic.loop = true;
    }
    this.playMusic();
  }

  musicSetting({ volume }) {
    this.#volume = volume;
  }

  playMusic() {
    this.#currentMusic?.play();
    /* Подумать над оптимизацией конструкции */
  }

  stopMusic() {
    this.#currentMusic?.pause();
  }
}
