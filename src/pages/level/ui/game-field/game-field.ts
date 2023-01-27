import { Enemies, Player } from '@/components';
import { GameObject } from '~/game-objects';
import { AttachSprite, Rectangle } from '~/sprites';

export type GameFieldOptions = GameObject;

const SPRITE_SIZE = 32;

@AttachSprite({
	Sprite: Rectangle,
	color: 'black',
	variant: 'both',
	strokeColor: 'white',
	strokeWidth: 6,
})
export class GameField extends GameObject {
	init(): void {
		const view = this.view as Rectangle<this>;
		new Player({
			height: SPRITE_SIZE,
			width: SPRITE_SIZE,
			x: view.innerLeft,
			y: view.innerBottom - SPRITE_SIZE,
		}).addParent(this);

		new Enemies({
			height: view.innerHeight,
			width: view.innerWidth,
			x: view.innerLeft,
			y: view.innerTop,
		}).addParent(this);

		super.init();
	}
}
