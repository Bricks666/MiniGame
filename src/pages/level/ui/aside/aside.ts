import { PADDING } from '@/shared/configs';
import {
	CurrentScore,
	CurrentScorePoints,
	MaxScore,
	MaxScorePoints
} from './ui';
import { GameObject, GameObjectOptions } from '~/game-objects';
import { AttachSprite, Rectangle } from '~/sprites';

export type AsideOptions = GameObjectOptions;

const options: (typeof GameObject)[] = [
	CurrentScore,
	CurrentScorePoints,
	MaxScore,
	MaxScorePoints
];
@AttachSprite({
	Sprite: Rectangle,
})
export class Aside extends GameObject {
	init(): void {
		let offsetY = 0;

		const { x, y, centerX, height, width, } = this;

		console.log(x, y, centerX, height, width);

		options.forEach((Item) => {
			const unit = new Item({
				x,
				y: y + offsetY,
				width,
				height: 20,
			});
			unit.centerX = centerX;

			console.log(unit);

			offsetY += unit.height + PADDING;
			unit.addParent(this);
		});

		super.init();
	}
}
