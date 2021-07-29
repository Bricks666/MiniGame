import Screen from "./Screen";
import Loading from "./Scenes/Loading";
import { MainMenu } from "./Scenes/MainMenu";
import Scene from "./Scene";
import { MusicPlayer } from "./MusicPlayer";

class Game {
  #screen;
  #scenes;
  #currentScene;
  #currentMusic;
  #allMediaLoaded;

  constructor({ width = 640, height = 640 }) {
    this.#screen = new Screen({ width, height });
    /*
    Подумать над тем, чтобы распределить изображения для сцен на каждую сцену
    Если сделать подгрузку изображения для каждой сцены ее обязанностью,
    То можно будет вынести общего предка у Loader'ов
    */
    /*     this.#screen.loadImages({
      menu: "img/MainMenu.png",
      player: "img/Player.png",
      tiles: "img/Title.png",
    }); */

    this.#scenes = {
      loading: { scene: new Loading(this), music: null },
      menu: {
        scene: new MainMenu(this, "img/MainMenu.png"),
        music: new MusicPlayer("music/menu.mp3"),
      },

      allMediaLoaded() {
        /* Изучить прокси, чтобы переписать все это безобразие */
        return new Promise((resolve) => {
          let id = setInterval(() => {
            let allLoaded = true;
            for (let property of Object.values(this)) {
              for (let value of Object.values(property)) {
                if (value?.loaded === false) {
                  allLoaded = false;
                  break;
                }
              }
              console.log(`key is ${property} and allLoaded is ${allLoaded}`);
              if (allLoaded === false) {
                break;
              }
            }
            if (allLoaded === true) {
              clearInterval(id);
              resolve();
            }
          }, 100);
        });
      },
    };
    this.#scenes.allMediaLoaded().then(() => {
      this.#allMediaLoaded = true;
    });
    this.#currentScene = this.#scenes.loading.scene;
    this.#currentMusic = this.#scenes.loading.music;
    this.#currentMusic?.startPlaying();
    this.#currentScene.init();
  }

  get screen() {
    return this.#screen;
  }

  get allMediaLoaded() {
    return this.#allMediaLoaded;
  }

  #changeScene(status) {
    switch (status) {
      case Scene.LOADED:
        this.#currentScene = this.#scenes.menu.scene;
        this.#currentMusic?.stopPlaying();
        this.#currentMusic = this.#scenes.menu.music;
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

    if (this.#currentMusic?.isStopped && document.hidden === false) {
      this.#currentMusic.startPlaying();
    }

    if (this.#currentMusic?.isStopped === false && document.hidden) {
      /* Подумать над оптимизацией конструкции */
      this.#currentMusic.stopPlaying();
    }

    this.#currentScene.render(time);

    requestAnimationFrame((time) => this.#frame(time));
  }

  start() {
    requestAnimationFrame((time) => this.#frame(time));
  }
}

export default Game;
