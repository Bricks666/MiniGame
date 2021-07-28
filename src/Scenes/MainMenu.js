import Scene from "../Scene";

export class MainMenu extends Scene {


  constructor(game, musicSrc) {
    super(game, musicSrc);
  }

  render(time) {
    this.game.screen.drawImage(0, 0, "menu");

    this.game.screen.print(
      this.game.screen.width / 25,
      this.game.screen.height / 1.1,
      "Нажмите любую клавишу, чтобы начать"
    );
    super.render(time);
  }

  init() {
    super.init();
  }
}
