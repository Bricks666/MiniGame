import { Audio } from '@/shared/packages/audio';
import { withScript } from '@/shared/packages/scripts';
import { Entity, EntityOptions } from '../entity';
import { BulletScript } from './bullet-script';

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

	onMount(): void {
		this.#audio.play();
	}

	onUnmount(): void {
		this.#audio.stop();
	}
}
