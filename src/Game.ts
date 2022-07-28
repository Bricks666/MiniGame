import { Screen } from './Screen';
/* import { MusicPlayer } from './MusicPlayer';
import { ControlState } from './ControlState';
import { ScenesChanger } from './ScenesChanger'; */
import { Group, Sprite } from '@/packages/core';

interface GameOptions {
	readonly screen: Screen;
}

class Game {
	screen: Screen;
/* 	musicPlayer: MusicPlayer;
	controlState: ControlState;
	scenesChanger: ScenesChanger; */
	sprites: Group;

	constructor(options: GameOptions) {
		const { screen } = options;
		this.screen = screen;
/* 		this.controlState = new ControlState();
		this.musicPlayer = new MusicPlayer();
		this.scenesChanger = new ScenesChanger(this); */
		this.sprites = new Group();
		this.sprites.add(
			new Sprite({
				height: 150,
				width: 100,
				x: 100,
				y: 100,
			})
		);
	}

	/*
  Срочно требуется изменить логику смены уровней,
  Может быть выделить в отдельный элемент,
  Потому что сцена сама решает, когда ей кончиться
  */
	/*  #changeScene(status) {
    switch (status) {
      case Scene.LOADED:
        this.#setScene(this.#scenes.menu);
        break;
      case Scene.START:
        this.#setScene(this.#scenes.level1);
        break;
    }
  } */

	update() {
		/*     if (this.#currentScene.status !== Scene.WORKING) {
      this.#changeScene(this.#currentScene.status);
    } */

		this.sprites.draw(this.screen);
/*
		if (document.hidden) {
			this.musicPlayer.stopMusic();
		} else if (!document.hidden) {
			setTimeout(() => this.musicPlayer.playMusic(), 200);
		} */

		// this.currentScene.render(time);

		requestAnimationFrame(this.update.bind(this));
	}

	start() {
		requestAnimationFrame(this.update.bind(this));
	}
}

export default Game;
