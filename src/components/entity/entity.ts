import { Sprite, SpriteOptions } from '~/game-objects';
import { AttachPhysics } from '~/physics';

export interface EntityOptions extends SpriteOptions {
	readonly health: number;
}

@AttachPhysics()
export class Entity extends Sprite {
	readonly health: number;

	constructor(options: EntityOptions) {
		const { health, ...spriteOptions } = options;
		super(spriteOptions);
		this.health = health;
	}
}
