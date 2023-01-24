import { Vector } from '@/shared/packages/math';
import {
	Group,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';
import { Enemy, Player } from '@/components';

export type GameFieldOptions = UnitsBlockOptions<GenerateOptions>;

interface GenerateOptions {
	readonly count: number;
}

export class GameField extends UnitsBlock<GenerateOptions> {
	constructor(options: GameFieldOptions = {}) {
		super({
			variant: 'fill',
			generateOptions: { count: 10, },
			...options,
		});
	}

	static generateUnits(block: UnitsBlock): Group<Unit> {
		const player = new Player({
			health: 100,
			height: 64,
			width: 64,
			x: block.shape.innerLeft,
			y: block.shape.innerBottom - 64,
			bodyOptions: {
				velocity: Vector.ZERO,
			},
			block,
		});

		const enemy = new Enemy({
			health: 4,
			height: 64,
			width: 64,
			x: block.shape.innerLeft,
			y: block.shape.innerTop,
			bodyOptions: {
				velocity: Vector.ZERO,
			},
			block,
		});

		return new Group({ units: [player, enemy], });
	}
}
