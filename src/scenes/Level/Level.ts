import { Scene, SceneOptions, ScenePart } from '@/packages/units';
import { GameField } from './SceneParts';

export class Level extends Scene {
	constructor(options: Omit<SceneOptions, 'createParts'>) {
		super({
			...options,
			color: 'black',
			createParts: Level.#createParts,
		});
	}

	static #createParts(): Array<ScenePart> {
		return [new GameField()];
	}
}
