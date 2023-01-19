import { Scene, SceneOptions, ScenePart } from '@/shared/packages/units';
import { Header, Menu } from './ui';

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
