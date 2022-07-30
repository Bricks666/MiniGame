import { ScenePart } from './scene-part';
import { Screen } from './Screen';

export class Scene {
	protected readonly sceneParts: ScenePart[];

	constructor() {
		this.sceneParts = [];
	}

	update(): void {
		this.sceneParts.forEach((scenePart) => scenePart.update());
	}

	draw(screen: Screen): void {
		this.sceneParts.forEach((scenePart) => scenePart.draw(screen));
	}
}
