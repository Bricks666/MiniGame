import { GAME_NAME } from '@/shared/configs';
import { Rectangle } from '@/shared/packages/primitives';
import {
	Group,
	Typography,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';

export type HeaderOptions = UnitsBlockOptions<never>;

export class Header extends UnitsBlock {
	constructor(options: HeaderOptions = {}) {
		super({
			color: 'black',
			...options,
		});
	}

	static generateUnits(shape: Rectangle): Group<Unit> {
		const headerText = new Typography({
			text: GAME_NAME,
			color: 'white',
			fontSize: 24,
		});
		headerText.shape.center = shape.center;
		return new Group({ units: [headerText], });
	}
}
