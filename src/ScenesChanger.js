import Loading from './Scenes/Loading';
import { MainMenu } from './Scenes/MainMenu';
import { Level1 } from './Scenes/Level1';

export class ScenesChanger {
	#allScenes;

	constructor(game) {
		this.#allScenes = {
			loading: new Loading(game),
			menu: new MainMenu(game, 'img/MainMenu.png', 'music/menu.mp3'),
			level1: new Level1(game, null, 'music/level1.mp3'),

			allMediaLoaded() {
				return new Promise((resolve) => {
					const allScenes = Object.values(this).filter((item) => {
						return item instanceof Function === false;
					});

					const id = setInterval(() => {
						let allMediaLoaded = true;
						for (const scene of allScenes) {
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
	}

	needToChangeScene() {}

	next(currentScene) {}
}
