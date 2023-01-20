import { Bullet, BulletOptions } from '../bullet';

export interface HeroBulletOptions
	extends Omit<BulletOptions, 'damage' | 'src'> {}

export class HeroBullet extends Bullet {
	constructor(options: HeroBulletOptions) {
		super({
			...options,
			src: 'sprites/hero_bullet.png',
			damage: 1,
		});
	}
}
