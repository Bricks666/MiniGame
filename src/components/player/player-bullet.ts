import { AttachScript } from '@/shared/packages/scripts';
import { AttachSprite, Image } from '@/shared/packages/sprites';
import { Bullet } from '../bullet';
import { PlayerBulletScript } from './player-bullet-script';

@AttachScript({
	Script: PlayerBulletScript,
})
@AttachSprite({
	Sprite: Image,
	src: 'sprites/hero_bullet.png',
})
export class PlayerBullet extends Bullet {}
