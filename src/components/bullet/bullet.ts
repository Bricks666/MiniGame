import { Coordinate } from '@/shared/packages/core';
import { Entity, EntityOptions } from '../entity';

export interface BulletOptions extends Omit<EntityOptions, 'health'> {
	readonly damage: number;
}

export class Bullet extends Entity {
	readonly #damage: number;

	constructor(options: BulletOptions) {
		const { damage, ...rest } = options;
		super({ ...rest, health: 1, });
		this.#damage = damage;
	}

	get damage(): number {
		return this.damage;
	}

	update(): void {
		this.moveOn({
			y: -5,
			x: 0,
		});
	}

	moveOn(coordinate: Coordinate): this {
		this.shape.x += coordinate.x;
		this.shape.y += coordinate.y;

		return this;
	}
}
