import { Enemy } from './enemy';
import { Vector } from '~/math';
import { WithBody } from '~/physics';
import { Script } from '~/scripts';

export class EnemyScript extends Script<WithBody<Enemy>> {
	intervalId: number | null = null;

	direction: Vector = new Vector(1, 0);

	isEnd = false;

	start(): void {
		this.intervalId = setInterval(() => {
			if (this.isEnd) {
				this.gameObject.moveOn({
					x: 0,
					y: this.gameObject.width / 2,
				});
				this.isEnd = false;

				this.direction.invert();

				return;
			}

			this.gameObject.moveOn({
				x: (this.gameObject.width / 4) * this.direction.x,
				y: 0,
			});

			this.checkEnd();
		}, 1000) as unknown as number;
	}

	checkEnd(): void {
		const { innerLeft, innerRight, } = this.gameObject.block;
		const step = this.gameObject.width / 4;

		this.isEnd =
			this.gameObject.x + step < innerLeft ||
			this.gameObject.endX + step > innerRight;
	}

	destroy(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		this.intervalId = null;
		this.destroy();
	}
}
