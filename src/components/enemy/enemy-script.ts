import { Enemy } from './enemy';
import { Script } from '~/scripts';

export class EnemyScript extends Script<Enemy> {
	intervalId: number | null = null;

	start(): void {
		this.intervalId = setInterval(() => {
			this.gameObject.moveOn({
				x: this.gameObject.width / 2,
				y: 0,
			});
		}, 1000) as unknown as number;
	}

	destroy(): void {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		this.intervalId = null;
		this.destroy();
	}
}
