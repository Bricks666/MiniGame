import { EnemyBullet } from '../enemy-bullet';
import { Enemy } from './enemy';
import { Vector } from '~/math';
import { WithBody } from '~/physics';
import { Script } from '~/scripts';

export class EnemyScript extends Script<WithBody<Enemy>> {
	movementId: number | null = null;

	shootId: number | null = null;

	direction: Vector = new Vector(1, 0);

	isEnd = false;

	start(): void {
		// this.movementId = setInterval(() => {
		// 	if (this.isEnd) {
		// 		this.gameObject.moveOn({
		// 			x: 0,
		// 			y: this.gameObject.width,
		// 		});
		// 		this.isEnd = false;
		// 		this.direction.invert();
		// 		return;
		// 	}
		// 	this.gameObject.moveOn({
		// 		x: (this.gameObject.width / 4) * this.direction.x,
		// 		y: 0,
		// 	});
		// 	this.checkEnd();
		// }, 500) as unknown as number;
		// this.shootId = setInterval(() => {
		// 	this.#shoot();
		// }, 1500) as unknown as number;
	}

	checkEnd(): void {
		const { innerLeft, innerRight, } = this.gameObject.scene.shape;
		const step = this.gameObject.width / 4;

		this.isEnd =
			this.gameObject.x - step < innerLeft ||
			this.gameObject.endX + step > innerRight;
	}

	#shoot() {
		new EnemyBullet({
			height: 17,
			width: 5,
			x: this.gameObject.centerX,
			y: this.gameObject.endY,
		})
			.addOnScene(this.gameObject.scene)
			.start();
	}

	destroy(): void {
		if (this.movementId) {
			clearInterval(this.movementId);
		}

		this.movementId = null;

		if (this.shootId) {
			clearInterval(this.shootId);
		}

		this.shootId = null;
	}
}
