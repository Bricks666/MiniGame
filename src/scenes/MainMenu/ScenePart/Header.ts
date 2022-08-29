import { DISPLAY_SIZE } from '@/consts/display';
import { GAME_NAME } from '@/consts/game';
import { ScenePart, Text } from '@/packages/core';

export class Header extends ScenePart {
	constructor() {
		super({
			height: 50,
			width: DISPLAY_SIZE.width,
			x: 0,
			y: 0,
		});
		const headerText = new Text({
			text: GAME_NAME,
			width: 150,
			fillStyle: 'white',
		});
		headerText.rect.center = this.rect.center;
		this.sprites.add(headerText);
	}
}
