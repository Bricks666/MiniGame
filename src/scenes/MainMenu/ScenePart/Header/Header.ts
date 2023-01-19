import { ScenePart, Typography } from '@/packages/units';
import { GAME_NAME } from '@/consts/game';
import { DISPLAY_SIZE, HEADER_HEIGHT } from '@/consts/display';

export class Header extends ScenePart {
	constructor() {
		super({
			height: HEADER_HEIGHT,
			width: DISPLAY_SIZE.width,
			x: 0,
			y: 0,
			color: 'black',
		});
		const headerText = new Typography({
			text: GAME_NAME,
			color: 'white',
		});
		headerText.shape.center = this.shape.center;
		this.units.add(headerText);
	}
}
