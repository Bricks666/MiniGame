import { GameObject } from '../game-objects';
import { Display } from '~/display';
import { AABB, AABBOptions } from '~/math';

export interface SpriteOptions<T extends GameObject> extends AABBOptions {
	readonly gameObject: T;
}

export class Sprite<T extends GameObject> extends AABB {
	#gameObject: T;

	constructor(options: SpriteOptions<T>) {
		const { gameObject, ...rest } = options;

		super(rest);
		this.#gameObject = gameObject;
	}

	get gameObject(): GameObject {
		return this.#gameObject;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(display: Display): void {
		return undefined;
	}
}
