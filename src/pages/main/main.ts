/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header, Menu } from './ui';
import { BlockOptions, Block, Group } from '~/game-objects';

export type MainOptions = BlockOptions<never>;

export class Main extends Block {
	constructor(options: MainOptions = {}) {
		super({
			...options,
			color: 'black',
		});
	}

	static generateUnits(block: Block): Group {
		const units = [
			new Header({
				height: 50,
				x: block.x,
				y: block.y,
				width: block.width,
			}),
			new Menu({
				width: block.width,
				height: block.height - 50,
				y: 50,
				x: 0,
			})
		];

		return new Group({ units, });
	}
}
