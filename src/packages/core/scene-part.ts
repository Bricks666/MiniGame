import { Group } from './group';
import { Screen } from './Screen';
import { Sprite } from './sprite';

export class ScenePart<T extends Sprite = Sprite> {
	protected readonly sprites: Group<T>;

	constructor() {
		this.sprites = new Group();
	}

	update() {
		this.sprites.update();
	}

	draw(screen: Screen) {
		this.sprites.draw(screen);
	}
}
