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
			padding: PADDING,
			color: 'black',
			...options,
		});
	}

	static generateUnits(shape: Rectangle): Group<Unit> {
		console.log(shape);
		const units = [
			new GameField({
				x: shape.innerLeft,
				y: shape.innerTop,
				variant: 'both',
				strokeColor: 'white',
				strokeWidth: 6,
				width: shape.innerWidth * 0.75,
				height: shape.innerHeight,
			}),
			new Aside({
				width: shape.innerWidth / 4,
				x: shape.innerWidth * 0.75,
				y: shape.innerTop,
				height: shape.innerHeight,
			})
		];
		return new Group({ units, });
	}
}
