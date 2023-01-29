import { Bullet, BulletScript } from '../../bullet';
import { Player } from '../../player';
import { GameObject } from '~/game-objects';
import { WithBody } from '~/physics';
import { ScriptOptions } from '~/scripts';

export class EnemyBulletScript extends BulletScript {
	constructor(options: ScriptOptions<WithBody<Bullet>>) {
		const { gameObject, } = options;

		super({
			gameObject,
			velocity: {
				x: 0,
				y: 350,
			},
		});
	}

	onCollision(gameObject: GameObject) {
		if (gameObject instanceof Player) {
			this.gameObject.destroy();
		}
	}
}
