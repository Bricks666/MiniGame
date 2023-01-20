import { DISPLAY_SIZE } from '@/shared/configs';
import { Rectangle } from '@/shared/packages/primitives';
import {
	Group,
	Sprite,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';

export type GameFieldOptions = UnitsBlockOptions<GenerateOptions>;

interface GenerateOptions {
	readonly count: number;
}

export class GameField extends UnitsBlock<GenerateOptions> {
	constructor(options: GameFieldOptions) {
		super({
			...DISPLAY_SIZE,
			x: 0,
			y: 0,
			strokeWidth: 2,
			variant: 'both',
			generateOptions: { count: 10, },
			...options,
		});
	}

	static generateUnits(
		shape: Rectangle,
		options: GenerateOptions
	): Group<Unit> {
		const units = Array(options.count)
			.fill(true)
			.map((_, i) => {
				return new Sprite({
					height: 64,
					width: 64,
					x: shape.x + 64 * i,
					y: shape.y + 64 * i,
					src: 'sprites/hero.png',
				});
			});

		return new Group({ units, });
	}
}
