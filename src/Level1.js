import Scene from "./Scenes/Scene";

export class Level1 extends Scene {
  constructor(game, imageSrc = null, musicSrc = null) {
    super(game, imageSrc, musicSrc);
  }

  init() {
    super.init();
  }

  render() {
    this.game.screen.print(150, 150, "Level1");
    this.game.screen.fill("red");

    super.render();
  }
}
