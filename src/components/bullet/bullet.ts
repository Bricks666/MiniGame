import { Entity, EntityOptions } from '../entity';
import { BulletScript } from './bullet-script';
import { Audio } from '~/audio';
import { withScript } from '~/scripts';

export interface BulletOptions extends Omit<EntityOptions, 'health'> {
	readonly damage: number;
}

@withScript({
	script: BulletScript,
})
export class Bullet extends Entity {
	readonly #damage: number;

	readonly #audio: Audio;

	constructor(options: BulletOptions) {
		const { damage, ...rest } = options;
		super({ ...rest, health: 1, });
		this.#damage = damage;
		this.#audio = new Audio({ src: 'musics/shoot.wav', volume: 0.5, });
	}

	get damage(): number {
		return this.damage;
	}
}
