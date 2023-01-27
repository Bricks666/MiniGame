import { Bullet, BulletScript } from '../bullet';
import { Enemy } from '../enemies';
import { GameObject } from '~/game-objects';
import { WithBody } from '~/physics';
import { ScriptOptions } from '~/scripts';

export class PlayerBulletScript extends BulletScript {
	constructor(options: ScriptOptions<WithBody<Bullet>>) {
		const { gameObject, } = options;

		super({
			gameObject,
			velocity: {
				x: 0,
				y: -350,
			},
		});
	}

	onCollision(gameObject: GameObject) {
		if (gameObject instanceof Enemy) {
			this.gameObject.destroy();
			gameObject.destroy();
		}
	}
}
