import { Coordinate } from '@/shared/packages/core';
import { Sprite, SpriteOptions } from '@/shared/packages/units';

export interface EntityOptions
	extends Pick<SpriteOptions, 'height' | 'src' | 'width' | 'x' | 'y'> {
	readonly health: number;
}

export abstract class Entity extends Sprite {
	readonly health: number;

	constructor(options: EntityOptions) {
		const { health, ...spriteOptions } = options;
		super(spriteOptions);
		this.health = health;
	}

	moveOn(coordinate: Coordinate): this {
		this.shape.x += coordinate.x;
		this.shape.y += coordinate.y;
		return this;
	}
}
