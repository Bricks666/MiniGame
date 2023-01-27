import { Engine } from '~/core';
import { Display } from '~/display';
import { GameObject, GameObjectLifeCycle, Group } from '~/game-objects';
import { World } from '~/physics';
import { Rectangle, RectangleOptions } from '~/sprites';

export interface SceneOptions {
	readonly blocks?: Group<GameObject>;
	readonly shapeOptions?: Omit<RectangleOptions<GameObject>, 'gameObject'>;
}

export class Scene implements GameObjectLifeCycle {
	readonly gameObjects: Group<GameObject>;

	readonly shape: Rectangle<GameObject>;

	readonly engine: Engine;

	readonly world: World;

	isInit = false;

	constructor(options: SceneOptions) {
		const { blocks, shapeOptions, } = options;

		this.gameObjects = blocks ?? new Group();
		this.engine = null as unknown as Engine;
		this.shape = new Rectangle({
			...shapeOptions,
			gameObject: null as unknown as GameObject,
		});
		this.world = new World();
	}

	addGameObject(gameObject: GameObject): this {
		this.gameObjects.add(gameObject);
		return this;
	}

	removeGameObject(gameObject: GameObject): this {
		this.gameObjects.remove(gameObject);
		return this;
	}

	init(): void {
		this.isInit = true;
		this.gameObjects.forEach((gameObject) => gameObject.init());
	}

	start(): void {
		this.gameObjects.forEach((gameObject) => gameObject.start());
	}

	update(): void {
		this.world.update();
		this.gameObjects.forEach((gameObject) => gameObject.update());
	}

	render(display: Display): void {
		this.shape.render(display);
		this.gameObjects.forEach((gameObject) => gameObject.render(display));
	}

	destroy(): void {
		this.gameObjects.forEach((gameObject) => gameObject.destroy());
	}
}
