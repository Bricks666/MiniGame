import { PADDING } from '@/shared/configs';
import { eventBus, EVENTS } from '@/shared/packages/events';
import { Block, BlockOptions, Button, Text, TextOptions } from '~/game-objects';

export type AsideOptions = BlockOptions;

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

export class Aside extends Block {
	init(): void {
		let offsetY = 0;

		const { x, y, centerX, height, } = this;

		options.forEach((option) => {
			const unit = new Text({
				x,
				y: y + offsetY,
				...option,
			});
			unit.centerX = centerX;

			offsetY += unit.height + PADDING;
			unit.addToBlock(this);
		});

		new Button({
			text: 'В меню',
			y: height,
			color: 'silver',
			onClick: () => {
				eventBus.emit(EVENTS.CHANGE_SCENE, 'mainMenu');
			},
		}).addToBlock(this).centerX = centerX;

		super.init();
	}
}
