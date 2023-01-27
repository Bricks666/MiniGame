import { Group, Groupable } from './group';
import { GameObjectLifeCycle } from './types';
import { Display } from '~/display';
import { AABB, AABBOptions, VectorLike } from '~/math';
import { Body } from '~/physics';
import { Scene } from '~/scene';
import { Script } from '~/scripts';
import { Sprite } from '~/sprites';

export interface GameObjectOptions extends AABBOptions {}

export class GameObject extends AABB implements GameObjectLifeCycle, Groupable {
	static #count = 1;

	readonly #groups: Set<Group<GameObject>>;

	#scene: Scene;

	readonly scripts: Set<Script<GameObject>>;

	body: Body | null;

	view: Sprite<this> | null;

	readonly #name: string;

	readonly #tag: string = 'UNTAGGED';

	#parent: GameObject | null;

	readonly #children: Group<GameObject>;

	constructor(options: GameObjectOptions) {
		super(options);
		this.#groups = new Set();
		this.#scene = null as unknown as Scene;
		this.view = null;
		this.body = null;
		this.scripts = new Set();
		this.#children = new Group();
		this.#parent = null;
		this.#name = `GameObject${GameObject.#count}`;
		GameObject.#count += 1;
	}

	static get count() {
		return this.#count;
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

	get parent(): GameObject | null {
		return this.#parent;
	}

	get children(): Group<GameObject> {
		return this.#children;
	}

	setScene(scene: Scene): this {
		this.#scene = scene;
		return this;
	}

	addOnScene(scene: Scene): this {
		if (this.scene) {
			this.removeFromScene();
		}

		scene.addGameObject(this);
		this.#scene = scene;

		return this;
	}

	removeFromScene(): this {
		if (this.scene) {
			this.scene.removeGameObject(this);
		}

		this.#scene = null as unknown as Scene;

		return this;
	}

	addChild(child: GameObject): this {
		this.#children.add(child);
		child.setScene(this.scene);
		return this;
	}

	removeChild(child: GameObject): this {
		this.#children.remove(child);
		child.setScene(null as unknown as Scene);
		return this;
	}

	addParent(parent: GameObject): this {
		if (this.#parent) {
			this.removeParent();
		}

		parent.addChild(this);
		this.#parent = parent;

		return this;
	}

	removeParent(): this {
		if (this.#parent) {
			this.#parent.removeChild(this);
		}

		this.#parent = null;

		return this;
	}

	init(): void {
		this.scripts.forEach((script) => script.init());
		this.#children.forEach((child) => child.init());
	}

	start(): void {
		this.scripts.forEach((script) => script.start());
		this.#children.forEach((child) => child.start());
	}

	render(display: Display): void {
		this.view?.render(display);
		this.#children.forEach((child) => child.render(display));
	}

	update(): void {
		this.body?.update();
		this.scripts.forEach((script) => script.update());
		this.#children.forEach((child) => child.update());
	}

	destroy(): void {
		this.body?.destroy();
		this.scripts.forEach((script) => script.destroy());
		this.#groups.forEach((group) => group.remove(this));
		this.scene.removeGameObject(this);
		this.#children.forEach((child) => child.destroy());
	}

	add(group: Group<this>): this {
		this.#groups.add(group);
		return this;
	}

	remove(group: Group<this>): void {
		this.#groups.delete(group);
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

window.go = GameObject;
