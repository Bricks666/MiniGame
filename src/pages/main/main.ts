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

	static generateUnits(shape: Rectangle): Group<Unit> {
		const units = [
			new Header({
				height: 50,
				x: shape.x,
				y: shape.y,
				width: shape.width,
			}),
			new Menu({
				width: shape.width,
				height: shape.height - 50,
				y: 50,
				x: 0,
			})
		];

		return new Group({ units, });
	}
}
