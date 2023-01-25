import { Enemy, Player } from '@/components';
import { Block, BlockOptions } from '~/game-objects';

export type GameFieldOptions = BlockOptions;

export class GameField extends Block {
	constructor(options: GameFieldOptions) {
		super({
			variant: 'fill',
			...options,
		});
	}

	init(): void {
		new Player({
			health: 100,
			height: 64,
			width: 64,
			x: this.innerLeft,
			y: this.innerBottom - 64,
		}).addToBlock(this);

		new Enemy({
			health: 4,
			height: 64,
			width: 64,
			x: this.innerLeft,
			y: this.innerTop,
		}).addToBlock(this);
	}
}
