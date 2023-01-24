import { Block, Group, Text } from '@/shared/packages/game-objects';

export class Loading extends Block {
	static generateUnits(shape: Block): Group {
		const group = new Group();
		const text = new Text({
			text: 'Loading...',
			color: 'white',
		});
		text.centerX = shape.centerX;
		text.centerY = shape.centerY;
		group.add(text);

		return group;
	}
}
