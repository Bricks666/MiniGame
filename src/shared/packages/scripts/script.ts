import { GameObject } from '../game-objects';

export class Script<T extends GameObject> {
	readonly gameObject: T;

	constructor(gameObject: T) {
		this.gameObject = gameObject;
	}

	start(): void {
		return undefined;
	}

	update(): void {
		return undefined;
	}

	destroy(): void {
		this.gameObject = null;
	}
}
