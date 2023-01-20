import { Entity, EntityOptions } from '../entity';
import { HeroBullet } from './hero-bullet';

export interface PlayerOptions
	extends Omit<EntityOptions, 'src' | 'direction'> {}

export class Player extends Entity {
	readonly #recharge: number;

	#lastShoot: number;

	constructor(options: PlayerOptions) {
		super({ ...options, src: '/sprites/hero.png', });
		this.#lastShoot = 0;
		this.#recharge = 500;
	}

	shoot(): HeroBullet | void {
		const current = Date.now();
		if (current < this.#lastShoot + this.#recharge) {
			return;
		}

		this.#lastShoot = current;

		return new HeroBullet({
			x: this.shape.centerX,
			y: this.shape.innerTop,
			height: 17,
			width: 5,
		});
	}
}
