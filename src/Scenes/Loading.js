import Scene from "../Scene";

class Loading extends Scene {
  #timeLoading;

  constructor(game) {
    super(game);
    this.#timeLoading = 0;
  }

  init() {
    super.init();
    this.#timeLoading = 0;
  }

  update(time) {
    if (this.#timeLoading > 30000) {
      alert("Проверьте скорость соединения с интернетом");
    }
    this.#timeLoading = time;
    console.log(this.#timeLoading);
    if (this.game.screen.isLoadedImages === true) {
      this._status = this.constructor.LOADED;
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
