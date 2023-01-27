import { Enemy, Player } from '@/components';
import { Block, BlockOptions } from '~/game-objects';

export type GameFieldOptions = BlockOptions;

const SPRITE_SIZE = 32;

export class GameField extends Block {
	constructor(options: GameFieldOptions) {
		super({
			variant: 'fill',
			...options,
		});
	}

	init(): void {
		new Player({
			height: SPRITE_SIZE,
			width: SPRITE_SIZE,
			x: this.innerLeft,
			y: this.innerBottom - SPRITE_SIZE,
		}).addToBlock(this);

		const gap = SPRITE_SIZE;

		const columnCount = Math.floor(this.innerWidth / (SPRITE_SIZE + gap * 2));

		for (let i = 0; i < columnCount; i += 1) {
			for (let j = 0; j < 8; j += 1) {
				new Enemy({
					height: SPRITE_SIZE,
					width: SPRITE_SIZE,
					x: this.innerLeft + gap + (SPRITE_SIZE + gap) * i,
					y: this.innerTop + gap + (SPRITE_SIZE + gap) * j,
				}).addToBlock(this);
			}
		}
	}
}
