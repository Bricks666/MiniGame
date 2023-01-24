import { PADDING } from '@/shared/configs';
import { GameObject } from '@/shared/packages/game-objects';
import { Group, UnitsBlock, UnitsBlockOptions } from '@/shared/packages/units';
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

	static generateUnits(block: UnitsBlock): Group<GameObject> {
		const units = [
			new GameField({
				x: block.shape.innerLeft,
				y: block.shape.innerTop,
				variant: 'both',
				strokeColor: 'white',
				strokeWidth: 6,
				width: block.shape.innerWidth * 0.75,
				height: block.shape.innerHeight,
			}),
			new Aside({
				width: block.shape.innerWidth / 4,
				x: block.shape.innerWidth * 0.75,
				y: block.shape.innerTop,
				height: block.shape.innerHeight,
			})
		];
		return new Group({ units, });
	}
}
