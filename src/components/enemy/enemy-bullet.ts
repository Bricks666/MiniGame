import { Bullet } from '../bullet';
import { EnemyBulletScript } from './enemy-bullet-script';
import { AttachScript } from '~/scripts';
import { AttachSprite, Image } from '~/sprites';

@AttachScript({ Script: EnemyBulletScript, })
@AttachSprite({
	Sprite: Image,
	src: 'sprites/enemy_bullet.png',
})
export class EnemyBullet extends Bullet {}
