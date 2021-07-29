import Scene from "../Scene";

class Loading extends Scene {
  #timeLoading;

  constructor(game, imageSrc) {
    super(game, imageSrc);
    this.#timeLoading = 0;
  }

  init() {
    super.init();
    this.#timeLoading = 0;
  }

  update(time) {
    if (this.game.allMediaLoaded === true) {
      this.finish(Scene.LOADED);
    }
  }

  render(time) {
    this.update(time);

    this.game.screen.fill("#000000");
    this.game.screen.print(
      this.game.screen.width / 2.7,
      this.game.screen.height / 2,
      "Loading..."
    );

    super.render(time);
  }
}

export default Loading;
