import { DISPLAY_SIZE } from '@/consts/display';
import { ScenePart } from '@/packages/core';
import { Sprite } from '@/packages/sprites';

export class GameField extends ScenePart {
	constructor() {
		super({
			rect: { ...DISPLAY_SIZE, x: 0, y: 0 },
		});
		this.#createSprites(10);
	}

	#createSprites(count: number) {
		for (let i = 0; i < count; i += 1) {
			this.units.add(
				new Sprite({
					rect: {
						height: 64,
						width: 64,
						x: 64 * i,
						y: 64 * i,
					},
					src: 'sprites/hero.png',
				})
			);
		}
		console.log(this.units);
	}
}
