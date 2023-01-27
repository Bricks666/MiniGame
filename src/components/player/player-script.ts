import { Enemy } from '../enemy';
import { HeroBullet } from './hero-bullet';
import { Player } from './player';
import { pressedKeys, keyNames } from '~/events';
import { GameObject } from '~/game-objects';
import { Script } from '~/scripts';

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

	onCollision(gameObject: GameObject): void {
		if (gameObject instanceof Enemy) {
			this.destroy();
		}
	}

	#moveLeft() {
		const { innerLeft, } = this.gameObject.block;
		if (innerLeft >= this.gameObject.x) {
			return;
		}

		this.gameObject.moveOn({ x: -5, y: 0, });
	}

	#moveRight() {
		const { innerRight, } = this.gameObject.block;
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

		new HeroBullet({
			x: gameObject.centerX,
			y: gameObject.y,
			height: 17,
			width: 5,
		})
			.addToBlock(this.gameObject.block)
			.start();
	}
}
