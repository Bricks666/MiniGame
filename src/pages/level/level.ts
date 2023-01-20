import { PADDING } from '@/shared/configs';
import { Rectangle } from '@/shared/packages/primitives';
import {
	Group,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';
import { Aside, GameField } from './ui';

export type LevelOptions = UnitsBlockOptions<never>;

export class Level extends UnitsBlock {
	constructor(options: LevelOptions = {}) {
		super({
			...options,
			color: 'black',
		});
	}

	static generateUnits(shape: Rectangle): Group<Unit> {
		const units = [
			new GameField({
				width: shape.width * 0.75 - PADDING * 2,
				x: PADDING,
				y: PADDING,
				variant: 'both',
				strokeColor: 'white',
				strokeWidth: 6,
				height: shape.height - PADDING * 2,
			}),
			new Aside({
				width: shape.width / 4,
				x: shape.width * 0.75,
				y: PADDING,
				height: shape.height - PADDING * 2,
			})
		];
		console.log(shape, units);
		return new Group({ units, });
	}
}
