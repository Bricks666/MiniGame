import { Group } from './group';
import { Rectangle, RectangleOptions } from './rectangle';
import { Unit } from './unit';
import { Display } from '~/display';
import { eventBus, EVENTS } from '~/events';
import { Scene } from '~/scene';

export interface BlockOptions extends Omit<RectangleOptions, 'layer'> {}

export class Block extends Rectangle {
	readonly units: Group<Unit>;

	constructor(options: BlockOptions) {
		super(options);
		this.units = new Group();

		eventBus.once(EVENTS.START, this.start, this);
	}

	addToScene(scene: Scene): this {
		if (this.scene) {
			this.removeFromScene(this.scene);
		}

		this.setScene(scene);
		scene.addBlock(this);

		return this;
	}

	removeFromScene(scene: Scene): this {
		if (this.scene !== scene) {
			return this;
		}

		this.setScene(null as unknown as Scene);
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
