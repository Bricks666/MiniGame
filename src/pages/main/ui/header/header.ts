import { GAME_NAME } from '@/shared/configs';
import {
	Block,
	BlockOptions,
	GameObject,
	Group,
	Text
} from '@/shared/packages/game-objects';

export type HeaderOptions = BlockOptions<never>;

export class Header extends Block {
	constructor(options: HeaderOptions = {}) {
		super({
			color: 'black',
			...options,
		});
	}

	static generateUnits(block: Block): Group<GameObject> {
		const headerText = new Text({
			text: GAME_NAME,
			color: 'white',
			fontSize: 24,
		});
		headerText.centerX = block.centerX;
		headerText.centerY = block.centerY;
		return new Group({ units: [headerText], });
	}
}
