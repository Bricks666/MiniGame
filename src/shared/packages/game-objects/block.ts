/* eslint-disable @typescript-eslint/no-unused-vars */
import { GameObject, GameObjectLifeCycle } from './game-object';
import { Group } from './group';
import { Rectangle, RectangleOptions } from './rectangle';
import { Display } from '~/display';

export interface BlockOptions<T extends Record<string, any> = never>
	extends Omit<RectangleOptions, 'layer'> {
	readonly generateOptions?: T;
}

export class Block<T extends Record<string, any> = never>
	extends Rectangle
	implements GameObjectLifeCycle
{
	readonly units: Group<GameObject>;

	static generateUnits(
		block: Block,
		options: Record<string, any>
	): Group<GameObject> {
		throw new Error('[Inheritance] generateUnits was not implemented');
	}

	constructor(options: BlockOptions<T>) {
		const { generateOptions, ...rest } = options;
		super({ ...rest, });
		this.block = this;
		this.units = (this as any).constructor.generateUnits(this, generateOptions);
	}

	start() {
		this.units.start();
		super.start();
	}

	draw(display: Display): void {
		super.draw(display);
		this.units.draw(display);
	}

	update(): void {
		this.units.update();
		super.update();
	}

	destroy(): void {
		this.units.destroy();
		super.destroy();
	}
}
