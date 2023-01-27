import { GameObject } from '@/shared/packages/game-objects';
import { WithBody } from '@/shared/packages/physics';
import { Bullet } from '../bullet';
import { Enemy } from '../enemy';
import { Script } from '~/scripts';

export class PlayerBulletScript extends Script<WithBody<Bullet>> {
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

	onCollision(gameObject: GameObject) {
		if (gameObject instanceof Enemy) {
			this.gameObject.destroy();
			gameObject.destroy();
		}
	}
}
