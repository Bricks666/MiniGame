import { GAME_NAME } from '@/shared/configs';
import { Block, BlockOptions, Text } from '~/game-objects';

export type HeaderOptions = BlockOptions;

export class Header extends Block {
	constructor(options: HeaderOptions) {
		super({
			color: 'black',
			...options,
		});
	}

	init(): void {
		const headerText = new Text({
			text: GAME_NAME,
			color: 'white',
			fontSize: 24,
		});
		headerText.centerX = this.centerX;
		headerText.centerY = this.centerY;

		this.units.add(headerText);
	}
}
