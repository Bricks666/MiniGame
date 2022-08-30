import { DISPLAY_SIZE, HEADER_HEIGHT } from '@/consts/display';
import { GAME_NAME } from '@/consts/game';
import { ScenePart, Text } from '@/packages/core';

export class Header extends ScenePart {
	constructor() {
		super({
			height: HEADER_HEIGHT,
			width: DISPLAY_SIZE.width,
			x: 0,
			y: 0,
		});
		const headerText = new Text({
			text: GAME_NAME,
			fillStyle: 'white',
		});
		headerText.rect.center = this.rect.center;
		this.sprites.add(headerText);
	}
}
