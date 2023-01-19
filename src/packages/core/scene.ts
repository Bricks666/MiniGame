import { ScenePart } from './scene-part';
import { Display } from '../display';

export class Scene {
	protected readonly sceneParts: ScenePart[];

	constructor() {
		this.sceneParts = [];
	}

	update(): void {
		this.sceneParts.forEach((scenePart) => scenePart.update());
	}

	draw(screen: Display): void {
		this.sceneParts.forEach((scenePart) => scenePart.draw(screen));
	}
}
