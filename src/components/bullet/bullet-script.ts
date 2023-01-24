import { Script } from '@/shared/packages/scripts';
import { Bullet } from './bullet';

export class BulletScript extends Script<Bullet> {
	update(): void {
		const { innerTop, innerBottom, } = this.gameObject.block!;
		if (innerTop >= this.gameObject.y || innerBottom <= this.gameObject.endY) {
			this.gameObject.destroy();
		}
	}
}
