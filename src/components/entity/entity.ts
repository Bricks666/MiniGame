import { Sprite, SpriteOptions } from '@/shared/packages/units';

export interface EntityOptions extends SpriteOptions {
	readonly health: number;
}

export class Entity extends Sprite {
	readonly health: number;

	constructor(options: EntityOptions) {
		const { health, ...spriteOptions } = options;
		super(spriteOptions);
		this.health = health;
	}
}
