import { WithBody } from '@/shared/packages/physics';
import { Bullet } from './bullet';
import { Script } from '~/scripts';

export class BulletScript extends Script<WithBody<Bullet>> {
	start(): void {
		this.gameObject.body.velocity.set({
			x: 0,
			y: -350,
		});
	}

	update(): void {
		const { innerTop, innerBottom, } = this.gameObject.block;
		if (innerTop >= this.gameObject.y || innerBottom <= this.gameObject.endY) {
			this.gameObject.destroy();
		}
	}
}
