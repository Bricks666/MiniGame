import { Scene } from '@/packages/core';
import { Header } from './ScenePart';

export class MainMenu extends Scene {
	constructor() {
		super();
		this.sceneParts.push(new Header());
	}
	/* render(time) {
		this.update();
		this.game.drawImage(0, 0, this.image);

		this.game.print(100, 600, 'Нажмите пробел, чтобы начать');
		super.render(time);
	} */
}
