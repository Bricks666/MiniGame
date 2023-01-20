import { DISPLAY_SIZE, HEADER_HEIGHT, GAME_NAME } from '@/shared/configs';
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
			height: HEADER_HEIGHT,
			width: DISPLAY_SIZE.width,
			x: 0,
			y: 0,
			color: 'black',
			...options,
		});
	}

	static generateUnits(shape: Rectangle): Group<Unit> {
		const headerText = new Typography({
			text: GAME_NAME,
			color: 'white',
		});
		headerText.shape.center = shape.center;
		return new Group({ units: [headerText], });
	}
}
