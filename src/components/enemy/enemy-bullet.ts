import { Bullet, BulletOptions } from '../bullet';
import { EnemyBulletScript } from './enemy-bullet-script';
import { AttachScript } from '~/scripts';

export interface EnemyBulletOptions
	extends Omit<BulletOptions, 'src' | 'damage' | 'direction'> {}

@AttachScript({ Script: EnemyBulletScript, })
export class EnemyBullet extends Bullet {
	constructor(options: EnemyBulletOptions) {
		super({
			...options,
			damage: 1,
			src: 'sprites/enemy_bullet.png',
		});
	}
}
