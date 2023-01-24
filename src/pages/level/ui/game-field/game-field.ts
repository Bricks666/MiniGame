import { Enemy, Player } from '@/components';
import { Block, BlockOptions, GameObject, Group } from '~/game-objects';
import { Vector } from '~/math';

export type GameFieldOptions = BlockOptions<GenerateOptions>;

interface GenerateOptions {
	readonly count: number;
}

export class GameField extends Block<GenerateOptions> {
	constructor(options: GameFieldOptions = {}) {
		super({
			variant: 'fill',
			generateOptions: { count: 10, },
			...options,
		});
	}

	static generateUnits(block: Block): Group<GameObject> {
		const player = new Player({
			health: 100,
			height: 64,
			width: 64,
			x: block.innerLeft,
			y: block.innerBottom - 64,
			bodyOptions: {
				velocity: Vector.ZERO,
			},
			block,
		});

		const enemy = new Enemy({
			health: 4,
			height: 64,
			width: 64,
			x: block.innerLeft,
			y: block.innerTop,
			bodyOptions: {
				velocity: Vector.ZERO,
			},
			block,
		});

		return new Group({ units: [player, enemy], });
	}
}
