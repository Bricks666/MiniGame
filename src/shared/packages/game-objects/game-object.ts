import { Group, Groupable } from './group';
import { Display } from '~/display';
import { AABB, AABBOptions, VectorLike } from '~/math';
import { Body } from '~/physics';
import { Scene } from '~/scene';
import { Script } from '~/scripts';
import { Sprite } from '~/sprites';

export interface GameObjectOptions extends AABBOptions {}

export interface GameObjectLifeCycle {
	start(): void;
	draw(display: Display): void;
	update(): void;
	destroy(): void;
}

export class GameObject extends AABB implements GameObjectLifeCycle, Groupable {
	static #count = 1;

	readonly #groups: Set<Group<GameObject>>;

	#scene: Scene;

	readonly scripts: Set<Script<GameObject>>;

	body: Body | null;

	view: Sprite<this> | null;

	readonly #name: string;

	readonly #tag: string = 'UNTAGGED';

	constructor(options: GameObjectOptions) {
		super(options);
		this.#groups = new Set();
		this.#scene = null as unknown as Scene;
		this.view = null;
		this.body = null;
		this.scripts = new Set();
		this.#name = `GameObject${GameObject.#count}`;
		GameObject.#count += 1;
	}

	get name(): string {
		return this.#name;
	}

	get tag(): string {
		return this.#tag;
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
		this.scripts.forEach((script) => script.start());
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	draw(display: Display): void {
		this.view?.render(display);
	}

	update(): void {
		this.body?.update();
		this.scripts.forEach((script) => script.update());
		return undefined;
	}

	destroy(): void {
		this.body?.destroy();
		this.scripts.forEach((script) => script.destroy());
		this.#groups.forEach((group) => group.remove(this));
	}

	moveOn(vector: VectorLike): this {
		super.moveOn(vector);
		this.body?.moveOn(vector);
		this.view?.moveOn(vector);
		return this;
	}

	moveTo(vector: VectorLike): this {
		super.moveTo(vector);
		this.body?.moveTo(vector);
		this.view?.moveTo(vector);
		return this;
	}
}
