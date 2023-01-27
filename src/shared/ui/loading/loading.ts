import { Scene } from '~/scene';
import { Text } from '~/sprites';

export class Loading extends Scene {
	init() {
		const text = new Text({
			text: 'Loading...',
			color: 'white',
		});
		text.centerX = this.shape.centerX;
		text.centerY = this.shape.centerY;

		super.init();
	}
}
