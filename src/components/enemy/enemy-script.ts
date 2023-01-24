import { Script } from '@/shared/packages/scripts';
import { Enemy } from './enemy';

export class EnemyScript extends Script<Enemy> {
	intervalId: number | null = null;

	start(): void {
		console.log(this.gameObject);
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
