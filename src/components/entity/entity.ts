import { Sprite, SpriteOptions } from '~/game-objects';
import { withBody } from '~/physics';

export interface EntityOptions extends SpriteOptions {
	readonly health: number;
}

@withBody()
export abstract class Entity extends Sprite {
	readonly health: number;

	constructor(options: EntityOptions) {
		const { health, ...spriteOptions } = options;
		super(spriteOptions);
		this.health = health;
	}
}
