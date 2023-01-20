import { Audio } from '@/shared/packages/audio';
import { Coordinate } from '@/shared/packages/core';
import { Entity, EntityOptions } from '../entity';

export interface BulletOptions extends Omit<EntityOptions, 'health'> {
	readonly damage: number;
	readonly direction: 1 | -1;
}

export class Bullet extends Entity {
	readonly #damage: number;

	readonly #audio: Audio;

	readonly #direction: 1 | -1;

	constructor(options: BulletOptions) {
		const { damage, direction, ...rest } = options;
		super({ ...rest, health: 1, });
		this.#damage = damage;
		this.#direction = direction;
		this.#audio = new Audio({ src: 'musics/shoot.wav', volume: 0.5, });
	}

	get damage(): number {
		return this.damage;
	}

	onMount(): void {
		this.#audio.play();
	}

	onUnmount(): void {
		this.#audio.stop();
	}

	update(): void {
		this.moveOn({
			y: 5 * this.#direction,
			x: 0,
		});
	}

	moveOn(coordinate: Coordinate): this {
		this.shape.x += coordinate.x;
		this.shape.y += coordinate.y;

		return this;
	}
}
