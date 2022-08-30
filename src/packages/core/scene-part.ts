import { Group } from './group';
import { Rect, RectParams } from './rect';
import { Screen } from './Screen';
import { Sprite } from './sprite';

export class ScenePart<T extends Sprite = Sprite> {
	rect: Rect;
	protected readonly sprites: Group<T>;

	constructor(rect: RectParams) {
		this.rect = new Rect(rect);
		this.sprites = new Group();
	}

	update(): void {
		this.sprites.update();
	}

	draw(screen: Screen): void {
		this.sprites.draw(screen);
	}
}
