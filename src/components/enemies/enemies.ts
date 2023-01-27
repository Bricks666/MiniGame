import { EnemiesScript } from './enemies-script';
import { GameObject } from '~/game-objects';
import { AttachScript } from '~/scripts';
import { AttachSprite, Rectangle } from '~/sprites';

@AttachSprite({
	Sprite: Rectangle,
})
@AttachScript({
	Script: EnemiesScript,
})
export class Enemies extends GameObject {}
