/* eslint-disable @typescript-eslint/no-unused-vars */
import { PADDING } from '@/shared/configs';
import { eventBus, EVENTS } from '~/events';
import { GameObject, GameObjectOptions } from '~/game-objects';
import { AttachSprite, Button, Rectangle, Text, TextOptions } from '~/sprites';

export type AsideOptions = GameObjectOptions;

const options: TextOptions[] = [
	{
		text: 'Current score',
		color: 'silver',
	},
	{
		text: '0 POINTS',
		color: 'silver',
	},
	{
		text: 'Max score',
		color: 'silver',
	},
	{
		text: '0 POINTS',
		color: 'silver',
	}
];
@AttachSprite({
	Sprite: Rectangle,
})
export class Aside extends GameObject {
	init(): void {
		const offsetY = 0;

		const { x, y, centerX, height, } = this;

		// options.forEach((option) => {
		// 	const unit = new Text({
		// 		x,
		// 		y: y + offsetY,
		// 		...option,
		// 	});
		// 	unit.centerX = centerX;

		// 	offsetY += unit.height + PADDING;
		// 	unit.addToBlock(this);
		// });

		// new Button({
		// 	text: 'В меню',
		// 	y: height,
		// 	color: 'silver',
		// 	onClick: () => {
		// 		eventBus.emit(EVENTS.CHANGE_SCENE, 'mainMenu');
		// 	},
		// }).addToBlock(this).centerX = centerX;

		super.init();
	}
}
