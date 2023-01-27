import { EnemyBullet } from '../enemy-bullet';
import { Enemy } from './enemy';
import { GameObject } from '~/game-objects';
import { WithBody } from '~/physics';
import { Script } from '~/scripts';

export class EnemyScript extends Script<WithBody<Enemy>> {
	onCollision(gameObject: GameObject): void {
		if (
			!(gameObject instanceof Enemy) &&
			!(gameObject instanceof EnemyBullet)
		) {
			this.gameObject.destroy();
		}
	}
}
