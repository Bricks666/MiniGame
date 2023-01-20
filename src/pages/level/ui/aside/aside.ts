import { PADDING } from '@/shared/configs';
import { eventBus } from '@/shared/packages/events';
import { Rectangle } from '@/shared/packages/primitives';
import {
	Button,
	Group,
	Typography,
	TypographyOptions,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';

export type AsideOptions = UnitsBlockOptions<never>;

const options: TypographyOptions[] = [
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

export class Aside extends UnitsBlock {
	static generateUnits(shape: Rectangle): Group<Unit> {
		let offsetY = 0;

		const units = options.map((option) => {
			const unit = new Typography({
				x: shape.x,
				y: shape.y + offsetY,
				...option,
			});
			unit.shape.centerX = shape.centerX;

			offsetY += unit.shape.height + PADDING;

			return unit;
		});
		const button = new Button({
			text: 'В меню',
			y: shape.height,
			onClick() {
				eventBus.emitChangeScene('mainMenu');
			},
			color: 'silver',
		});

		button.shape.centerX = shape.centerX;

		units.push(button);

		return new Group({ units, });
	}
}
