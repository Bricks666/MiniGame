import { Entity, EntityOptions } from '../entity';
import { PlayerScript } from './player-script';
import { withScript } from '~/scripts';

export interface PlayerOptions
	extends Omit<EntityOptions, 'src' | 'direction'> {}

@withScript({
	script: PlayerScript,
})
export class Player extends Entity {
	constructor(options: PlayerOptions) {
		super({ ...options, src: '/sprites/hero.png', });
	}
}
