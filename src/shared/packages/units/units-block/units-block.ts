/* eslint-disable @typescript-eslint/no-unused-vars */
import { Display } from '@/shared/packages/display';
import { Rectangle } from '@/shared/packages/primitives';
import { Group } from '../group';
import { Unit, ExtractShapeOptions, UnitOptions } from '../unit';

export type UnitsBlockOptions<T extends Record<string, any>> =
	ExtractShapeOptions<UnitOptions<typeof Rectangle>>;

type UnitsBlockConstructorOptions<T extends Record<string, any>> =
	UnitsBlockOptions<T> & {
		readonly generateOptions?: T;
	};

export class UnitsBlock<T extends Record<string, any> = never> extends Unit<
	typeof Rectangle
> {
	readonly units: Group<Unit>;

	constructor(options: UnitsBlockConstructorOptions<T>) {
		const { generateOptions, ...rest } = options;
		super({ shapeOptions: [rest], shape: Rectangle, });

		this.units = (this as any).constructor.generateUnits(
			this.shape,
			generateOptions
		);
	}

	draw(display: Display): void {
		super.draw(display);
		this.units.draw(display);
	}

	update(): void {
		return undefined;
	}

	static generateUnits(
		shape: Rectangle,
		options: Record<string, any>
	): Group<Unit> {
		throw new Error('[Inheritance] generateUnits was not implemented');
	}
}
