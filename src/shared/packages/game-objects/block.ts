import { GameObjectLifeCycle } from './game-object';
import { Group } from './group';
import { Rectangle, RectangleOptions } from './rectangle';
import { Unit } from './unit';
import { Display } from '~/display';
import { eventBus, EVENTS } from '~/events';
import { Scene } from '~/scene';

export interface BlockOptions extends Omit<RectangleOptions, 'layer'> {}

export class Block extends Rectangle implements GameObjectLifeCycle {
	readonly units: Group<Unit>;

	#scene: Scene;

	constructor(options: BlockOptions) {
		super(options);
		this.#scene = null as unknown as Scene;
		this.units = new Group();

		eventBus.once(EVENTS.START, this.start, this);
	}

	get scene(): Scene {
		return this.#scene;
	}

	addToScene(scene: Scene): this {
		if (this.scene) {
			this.removeFromScene(this.scene);
		}

		this.#scene = scene;
		scene.addBlock(this);

		return this;
	}

	removeFromScene(scene: Scene): this {
		if (this.scene !== scene) {
			return this;
		}

		this.#scene = null as unknown as Scene;
		scene.removeBlock(this);

		return this;
	}

	addUnit(unit: Unit) {
		this.units.add(unit);

		return this;
	}

	removeUnit(unit: Unit) {
		this.units.remove(unit);

		return this;
	}

	init(): void {
		return undefined;
	}

	start() {
		super.start();
		this.units.forEach((unit) => unit.start());
	}

	draw(display: Display): void {
		super.draw(display);
		this.units.forEach((unit) => unit.draw(display));
	}

	update(): void {
		this.units.forEach((unit) => unit.update());
		super.update();
	}

	destroy(): void {
		this.units.forEach((unit) => unit.destroy());
		this.removeFromScene(this.scene);
		super.destroy();
	}
}
