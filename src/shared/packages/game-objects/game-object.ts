import { Group } from './group';
import { Display } from '~/display';
import { AABB, AABBOptions } from '~/math';
import { Scene } from '~/scene';

export interface GameObjectOptions extends AABBOptions {}

export interface GameObjectLifeCycle {
	start(): void;
	draw(display: Display): void;
	update(): void;
	destroy(): void;
}

export class GameObject extends AABB implements GameObjectLifeCycle {
	readonly #groups: Set<Group<this>>;

	#scene: Scene;

	constructor(options: GameObjectOptions) {
		super(options);
		this.#groups = new Set();
		this.#scene = null as unknown as Scene;
	}

	get scene(): Scene {
		return this.#scene;
	}

	setScene(scene: Scene): this {
		this.#scene = scene;

		return this;
	}

	add(group: Group<this>): this {
		this.#groups.add(group);
		return this;
	}

	remove(group: Group<this>): void {
		this.#groups.delete(group);
	}

	start(): void {
		return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	draw(display: Display): void {
		return undefined;
	}

	update(): void {
		return undefined;
	}

	destroy(): void {
		this.#groups.forEach((group) => group.remove(this));
	}
}
