import Scene from "./Scene";

export class MainMenu extends Scene {
  constructor(game, imageSrc, musicSrc) {
    super(game, imageSrc, musicSrc);
  }

  init() {
    super.init();
  }

  update() {
    if(this.game.controlState.currentAction === 'fire') {
      super.finish(this.constructor.START);
    }
  }

  render(time) {
    this.update();
    this.game.screen.drawImage(0, 0, this.image);

    this.game.screen.print(
      this.game.screen.width / 8,
      this.game.screen.height / 1.1,
      "Нажмите пробел, чтобы начать"
    );
    super.render(time);
  }


}
