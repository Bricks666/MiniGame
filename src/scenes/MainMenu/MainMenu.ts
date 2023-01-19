import { Scene, SceneOptions, ScenePart } from '@/packages/units';
import { Header } from './ScenePart/Header';
import { Menu } from './ScenePart/Menu';

export class MainMenu extends Scene {
	constructor(options: Omit<SceneOptions, 'createParts'> = {}) {
		super({
			...options,
			color: 'black',
			createParts: MainMenu.#createParts,
		});
	}

	static #createParts(): Array<ScenePart> {
		return [new Header(), new Menu()];
	}
}
