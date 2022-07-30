import { ScenePart, Text } from '@/packages/core';

export class Header extends ScenePart {
	constructor() {
		super();
		const headerText = new Text({
			text: 'MiniGame',
			imageSrc: '',
			width: 150,
		});

		this.sprites.add(headerText);
	}
}
