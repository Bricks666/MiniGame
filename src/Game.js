import Screen from "./Screen";
import Loading from "./Scenes/Loading";
import { MainMenu } from "./Scenes/MainMenu";
import Scene from "./Scenes/Scene";
import { MusicPlayer } from "./MusicPlayer";
import { ControlState } from "./ControlState";
import { Level1 } from "./Level1";

class Game {
  #screen;

  #scenes;
  #currentScene;

  #musicPlayer;

  #allMediaLoaded;

  #controlState;

  constructor({ width = 640, height = 640 }) {
    this.#screen = new Screen({ width, height });

    this.#controlState = new ControlState();

    this.#musicPlayer = new MusicPlayer();

    this.#scenes = {
      loading: new Loading(this),
      menu: new MainMenu(this, "img/MainMenu.png", "music/menu.mp3"),
      level1: new Level1(this),

      allMediaLoaded() {
        /* Изучить прокси, чтобы переписать все это безобразие */
        return new Promise((resolve) => {
          const allScenes = Object.values(this).filter((item) => {
            return item instanceof Function === false;
          });

          let id = setInterval(() => {
            let allMediaLoaded = true;
            for (let scene of allScenes) {
              if (scene.allMediaLoaded === false) {
                allMediaLoaded = false;
                break;
              }
            }
            if (allMediaLoaded === true) {
              clearInterval(id);
              resolve();
            }
          }, 100);
        });
      },
    };

    this.#setScene(this.#scenes.loading);

    this.#currentScene.init();

    this.#scenes.allMediaLoaded().then(() => this.#currentScene.finish());
  }

  get screen() {
    return this.#screen;
  }

  get isAllMediaLoaded() {
    return this.#allMediaLoaded;
  }

  get controlState() {
    return this.#controlState;
  }

  #setScene(nextScene) {
    this.#currentScene = nextScene;
    this.#musicPlayer.changePlayingMusic(this.#currentScene.music);
  }

  /*
  Срочно требуется изменить логику смены уровней,
  Может быть выделить в отдельный элемент,
  Потому что сцена сама решает, когда ей кончиться
  */
  #changeScene(status) {
    switch (status) {
      case Scene.LOADED:
        this.#setScene(this.#scenes.menu);
        break;
      case Scene.START:
        this.#setScene(this.#scenes.level1);
        break;
      default:
        this.#currentScene = this.#scenes.loading;
    }
  }

  #frame(time) {
    if (this.#currentScene.status !== Scene.WORKING) {
      this.#changeScene(this.#currentScene.status);
      this.#currentScene.init();
    }

    if (this.#musicPlayer.isMusicPlaying && document.hidden) {
      this.#musicPlayer.stopMusic();
    } else if (
      this.#musicPlayer.isMusicPlaying === false &&
      document.hidden === false
    ) {
      setTimeout(() => this.#musicPlayer.playMusic(), 200);
    }

    this.#currentScene.render(time);

    requestAnimationFrame((time) => this.#frame(time));
  }

  start() {
    requestAnimationFrame((time) => this.#frame(time));
  }
}

export default Game;
