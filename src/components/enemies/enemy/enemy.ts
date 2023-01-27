import { Entity } from '../../entity';
import { EnemyScript } from './enemy-script';
import { AttachScript } from '~/scripts';
import { AttachSprite, Image } from '~/sprites';

@AttachScript({
	Script: EnemyScript,
})
@AttachSprite({
	Sprite: Image,
	src: 'sprites/enemy.png',
})
export class Enemy extends Entity {}
