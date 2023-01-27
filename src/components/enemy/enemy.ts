import { Entity, EntityOptions } from '../entity';
import { EnemyBullet } from './enemy-bullet';
import { EnemyScript } from './enemy-script';
import { AttachScript } from '~/scripts';

export interface EnemyOptions extends Omit<EntityOptions, 'src'> {}

@AttachScript({
	Script: EnemyScript,
})
export class Enemy extends Entity {
	constructor(options: EnemyOptions) {
		super({
			...options,
			src: 'sprites/enemy.png',
		});
	}

	shoot(): EnemyBullet {
		return new EnemyBullet({
			height: 17,
			width: 5,
			x: this.shape.centerX,
			y: this.shape.innerBottom,
		});
	}
}
