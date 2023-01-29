import { Enemy } from '../enemies';
import { Player } from './player';
import { PlayerBullet } from './player-bullet';
import { pressedKeys, keyNames } from '~/events';
import { GameObject } from '~/game-objects';
import { Script } from '~/scripts';
import { Rectangle } from '~/sprites';

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
			this.gameObject.destroy();
		}
	}

	#moveLeft() {
		const { innerLeft, } =
			(this.gameObject.parent?.view as Rectangle<any> | null) ||
			this.gameObject.scene.shape;
		if (innerLeft >= this.gameObject.x) {
			return;
		}

		this.gameObject.moveOn({ x: -5, y: 0, });
	}

	#moveRight() {
		const { innerRight, } =
			(this.gameObject.parent?.view as Rectangle<any> | null) ||
			this.gameObject.scene.shape;
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

		new PlayerBullet({
			x: gameObject.centerX,
			y: gameObject.y,
			height: 17,
			width: 5,
		})
			.addOnScene(this.gameObject.scene)
			.start();
	}
}
