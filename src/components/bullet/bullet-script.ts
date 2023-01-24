import { Script } from '@/shared/packages/scripts';
import { Bullet } from './bullet';

export class BulletScript extends Script<Bullet> {
	update(): void {
		const { shape, } = this.gameObject.block;
		if (
			shape.innerTop >= this.gameObject.y ||
			shape.innerBottom <= this.gameObject.endY
		) {
			this.gameObject.destroy();
		}
	}
}
