import { Entity } from '../entity';
import { PlayerScript } from './player-script';
import { AttachScript } from '~/scripts';
import { AttachSprite, Image } from '~/sprites';

@AttachScript({
	Script: PlayerScript,
})
@AttachSprite({
	Sprite: Image,
	src: '/sprites/hero.png',
})
export class Player extends Entity {}
