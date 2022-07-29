import { ScenePart } from './scene-part';
import { Screen } from './screen';

export class Scene {
	protected readonly sceneParts: ScenePart[];

	constructor() {
		this.sceneParts = [];
	}

	update() {
		this.sceneParts.forEach((scenePart) => scenePart.update());
	}

	draw(screen: Screen) {
		this.sceneParts.forEach((scenePart) => scenePart.draw(screen));
	}
}
