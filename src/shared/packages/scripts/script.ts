import { GameObject, GameObjectLifeCycle } from '~/game-objects';

export interface ScriptOptions<O extends GameObject> {
	readonly gameObject: O;
}

export class Script<O extends GameObject> implements GameObjectLifeCycle {
	readonly gameObject: O;

	constructor(options: ScriptOptions<O>) {
		const { gameObject, } = options;
		this.gameObject = gameObject;
	}

	init(): void {
		return undefined;
	}

	start(): void {
		return undefined;
	}

	update(): void {
		return undefined;
	}

	render(): void {
		return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onCollision(gameObject: GameObject): void {
		return undefined;
	}

	destroy(): void {
		this.gameObject = null;
	}
}
