import { PADDING } from '@/shared/configs';
import { eventBus } from '~/events';
import {
	Block,
	BlockOptions,
	Button,
	Group,
	Text,
	TextOptions
} from '~/game-objects';

export type AsideOptions = BlockOptions<never>;

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
	static generateUnits(block: Block): Group {
		let offsetY = 0;

		const units = options.map((option) => {
			const unit = new Text({
				x: block.x,
				y: block.y + offsetY,
				...option,
			});
			unit.centerX = block.centerX;

			offsetY += unit.height + PADDING;

			return unit;
		});
		const button = new Button({
			text: 'В меню',
			y: block.height,
			onClick() {
				eventBus.emitChangeScene('mainMenu');
			},
			color: 'silver',
		});

		button.centerX = block.centerX;

		units.push(button);

		return new Group({ units, });
	}
}
