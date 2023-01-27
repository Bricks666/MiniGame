import { AttachScript } from '@/shared/packages/scripts';
import { Bullet, BulletOptions } from '../bullet';
import { PlayerBulletScript } from './player-bullet-script';

export interface HeroBulletOptions
	extends Omit<BulletOptions, 'damage' | 'src' | 'direction'> {}

@AttachScript({
	Script: PlayerBulletScript,
})
export class HeroBullet extends Bullet {
	constructor(options: HeroBulletOptions) {
		super({
			...options,
			src: 'sprites/hero_bullet.png',
			damage: 1,
		});
	}
}
