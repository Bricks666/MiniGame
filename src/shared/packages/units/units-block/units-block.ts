/* eslint-disable @typescript-eslint/no-unused-vars */
import { Display } from '@/shared/packages/display';
import { Rectangle } from '@/shared/packages/primitives';
import { GameObject, GameObjectOptions } from '../../game-objects';
import { Group } from '../group';

export interface UnitsBlockOptions<T extends Record<string, any> = never>
	extends GameObjectOptions {
	readonly generateOptions: T;
}

export class UnitsBlock<
	T extends Record<string, any> = never
> extends GameObject {
	readonly units: Group<GameObject>;

	static generateUnits(
		block: UnitsBlock,
		options: Record<string, any>
	): Group<GameObject> {
		throw new Error('[Inheritance] generateUnits was not implemented');
	}

	constructor(options: UnitsBlockOptions<T>) {
		const { generateOptions, ...rest } = options;
		super(rest);

		this.units = (this as any).constructor.generateUnits(this, generateOptions);
	}

	start() {
		super.start();
		this.units.start();
	}

	draw(display: Display): void {
		super.draw(display);
		this.units.draw(display);
	}

	update(): void {
		this.units.update();
	}

	destroy(): void {
		this.units.destroy();
	}
}
