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
		const units = [new Header(), new Menu()];

		return new Group({ units, });
	}
}
