import { Enemy } from './enemy';
import { GameObject } from '~/game-objects';
import { AttachSprite, Rectangle } from '~/sprites';

const SPRITE_SIZE = 32;

const gap = SPRITE_SIZE;

@AttachSprite({
	Sprite: Rectangle,
})
export class Enemies extends GameObject {
	init(): void {
		const view = this.view as Rectangle<this>;

		const columnCount = Math.floor(view.innerWidth / (SPRITE_SIZE + gap * 2));
		const centerColumn = columnCount / 2;
		const xStart = view.centerX - centerColumn * (SPRITE_SIZE + gap);

		for (let i = 0; i < columnCount; i += 1) {
			for (let j = 0; j < 5; j += 1) {
				new Enemy({
					height: SPRITE_SIZE,
					width: SPRITE_SIZE,
					x: xStart + (SPRITE_SIZE + gap) * i,
					y: view.innerTop + gap + (SPRITE_SIZE + gap) * j,
				}).addParent(this);
			}
		}
		super.init();
	}
}
