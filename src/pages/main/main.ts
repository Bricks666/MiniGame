/* eslint-disable @typescript-eslint/no-unused-vars */
import { Rectangle } from '@/shared/packages/primitives';
import {
	Group,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';
import { Header, Menu } from './ui';

export type MainOptions = UnitsBlockOptions<never>;

export class Main extends UnitsBlock {
	constructor(options: MainOptions = {}) {
		super({
			...options,
			color: 'black',
		});
	}

	static generateUnits(block: UnitsBlock): Group<Unit> {
		const units = [
			new Header({
				height: 50,
				x: block.shape.x,
				y: block.shape.y,
				width: block.shape.width,
			}),
			new Menu({
				width: block.shape.width,
				height: block.shape.height - 50,
				y: 50,
				x: 0,
			})
		];

		return new Group({ units, });
	}
}
