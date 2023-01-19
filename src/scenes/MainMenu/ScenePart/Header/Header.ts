import { DISPLAY_SIZE, HEADER_HEIGHT } from '@/consts/display';
import { GAME_NAME } from '@/consts/game';
import { Text } from '@/packages/units';
import { ScenePart } from '@/packages/core';

export class Header extends ScenePart {
	constructor() {
		super({
			rect: { height: HEADER_HEIGHT, width: DISPLAY_SIZE.width },
		});
		const headerText = new Text({
			text: GAME_NAME,
			fillStyle: 'white',
		});
		headerText.rect.center = this.rect.center;
		this.units.add(headerText);
	}
}
