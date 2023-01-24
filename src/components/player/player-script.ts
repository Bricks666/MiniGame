import { pressedKeys, keyNames } from '@/shared/packages/events';
import { Script } from '@/shared/packages/scripts';
import { HeroBullet } from './hero-bullet';
import { Player } from './player';

export class PlayerScript extends Script<Player> {
	#lastShoot = 0;

	readonly #recharge = 500;

	update() {
		if (pressedKeys[keyNames.LEFT]) {
			this.#moveLeft();
		}
		if (pressedKeys[keyNames.RIGHT]) {
			this.#moveRight();
		}
		if (pressedKeys[keyNames.SPACE]) {
			this.#shoot();
		}
	}

	#moveLeft() {
		const { innerLeft, } = this.gameObject.block!;
		if (innerLeft >= this.gameObject.x) {
			return;
		}

		this.gameObject.moveOn({ x: -5, y: 0, });
	}

	#moveRight() {
		const { innerRight, } = this.gameObject.block!;
		if (innerRight <= this.gameObject.endX) {
			return;
		}

		this.gameObject.moveOn({
			x: 5,
			y: 0,
		});
	}

	#shoot() {
		const current = Date.now();
		if (current < this.#lastShoot + this.#recharge) {
			return;
		}

		this.#lastShoot = current;

		const { gameObject, } = this;

		const bullet = new HeroBullet({
			x: gameObject.centerX,
			y: gameObject.y,
			bodyOptions: {
				velocity: {
					x: 0,
					y: -5,
				},
			},
			height: 17,
			width: 5,
			block: gameObject.block,
		});
		this.gameObject.block?.units.add(bullet as any);
	}
}
