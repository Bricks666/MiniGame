import { Bullet, BulletOptions } from '../bullet';

export interface EnemyBulletOptions
	extends Omit<BulletOptions, 'src' | 'damage' | 'direction'> {}

export class EnemyBullet extends Bullet {
	constructor(options: EnemyBulletOptions) {
		super({
			...options,
			damage: 1,
			direction: 1,
			src: 'sprites/enemy_bullet.png',
		});
	}
}
