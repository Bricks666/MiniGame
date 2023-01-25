import { Block, Text } from '~/game-objects';
import { Scene } from '~/scene';

export class Loading extends Scene {
	init() {
		const block = new Block(this.shape);

		const text = new Text({
			text: 'Loading...',
			color: 'white',
		});
		text.centerX = this.shape.centerX;
		text.centerY = this.shape.centerY;

		text.addToBlock(block);

		block.addToScene(this);

		super.init();
	}
}
