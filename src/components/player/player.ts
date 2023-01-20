import { Coordinate } from '@/shared/packages/core';
import { Entity, EntityOptions } from '../entity';

export type PlayerOptions = Omit<EntityOptions, 'src'>;

export class Player extends Entity {
	constructor(options: PlayerOptions) {
		super({ ...options, src: '/sprites/hero.png', });
	}

	moveOn(coordinate: Coordinate): this {
		this.shape.x += coordinate.x;
		this.shape.y += coordinate.y;
		return this;
	}
}
