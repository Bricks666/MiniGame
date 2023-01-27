import { Bullet } from '../bullet';
import { PlayerBulletScript } from './player-bullet-script';
import { AttachScript } from '~/scripts';
import { AttachSprite, Image } from '~/sprites';

@AttachScript({
	Script: PlayerBulletScript,
})
@AttachSprite({
	Sprite: Image,
	src: 'sprites/hero_bullet.png',
})
export class PlayerBullet extends Bullet {}
