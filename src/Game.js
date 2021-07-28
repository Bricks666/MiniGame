import Screen from "./Screen";
import Loading from "./Scenes/Loading";
import { MainMenu } from "./Scenes/MainMenu";
import Scene from "./Scene";

class Game {
  #screen;
  #scenes;
  #currentScene;

  constructor({ width = 640, height = 640 }) {
    this.#screen = new Screen({ width, height });
    this.#screen.loadImages({
      menu: "img/MainMenu.png",
      player: "img/Player.png",
      tiles: "img/Title.png",
    });

    this.#scenes = {
      loading: new Loading(this),
      menu: new MainMenu(this),
    };
    this.#currentScene = this.#scenes.loading;
    this.#currentScene.init();
  }

  get screen() {
    return this.#screen;
  }

  /*
ОЧЕНЬ СТРАННЫЙ МЕХАНИЗМ СМЕНЫ СЦЕН
НУЖНО ПЕРЕРАБОТАТЬ
*/

  #changeScene(status) {
    switch (status) {
      case Scene.LOADED:
        this.#currentScene = this.#scenes.menu;
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

    this.#currentScene.render(time);

    requestAnimationFrame((time) => this.#frame(time));
  }

  start() {
    requestAnimationFrame((time) => this.#frame(time));
  }
}

export default Game;
