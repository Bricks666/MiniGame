import { Scene, SceneOptions, ScenePart } from '@/shared/packages/units';
import { GameField } from './ui';

export class Level extends Scene {
	constructor(options: Omit<SceneOptions, 'createParts' | 'color'>) {
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
