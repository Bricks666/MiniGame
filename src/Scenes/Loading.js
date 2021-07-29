import Scene from "./Scene";

class Loading extends Scene {
  constructor(game, imageSrc = null, musicSrc = null) {
    super(game, imageSrc, musicSrc);
  }

  init() {
    super.init();
  }

  update(time) {}

  render(time) {
    this.game.screen.fill("#000000");
    this.game.screen.print(
      this.game.screen.width / 2.7,
      this.game.screen.height / 2,
      "Loading..."
    );

    super.render(time);
  }

  finish() {
    super.finish(Scene.LOADED);
  }
}

export default Loading;
