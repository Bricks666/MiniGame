import { DISPLAY_SIZE } from '@/consts/display';
import { ScenePart, Sprite } from '@/packages/core';

export class GameField extends ScenePart {
	constructor() {
		super({
			...DISPLAY_SIZE,
		});
		for (let i = 0; i < 10; i += 1) {
			this.sprites.add(
				new Sprite({
					height: 64,
					width: 64,
					x: 64 * i,
					y: 64 * i,
					imageSrc: 'assets/img/Player.png',
				})
			);
		}
	}
}
