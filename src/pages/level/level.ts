import { PADDING } from '@/shared/configs';
import { Aside, GameField } from './ui';
import { Block, BlockOptions, GameObject, Group } from '~/game-objects';

export interface LevelOptions extends BlockOptions {}

export class Level extends Block {
	constructor(options: LevelOptions = {}) {
		super({
			padding: PADDING,
			color: 'black',
			...options,
		});
	}

	static generateUnits(block: Block): Group<GameObject> {
		const units = [
			new GameField({
				x: block.innerLeft,
				y: block.innerTop,
				variant: 'both',
				strokeColor: 'white',
				strokeWidth: 6,
				width: block.innerWidth * 0.75,
				height: block.innerHeight,
			}),
			new Aside({
				width: block.innerWidth / 4,
				x: block.innerWidth * 0.75,
				y: block.innerTop,
				height: block.innerHeight,
			})
		];
		return new Group({ units, });
	}
}
