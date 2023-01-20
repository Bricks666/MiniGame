import { Display } from '@/shared/packages/display';
import { Drawable, Polygon, Rectangle } from '@/shared/packages/primitives';
import { Group } from '../group';

export interface UnitOptions<T extends typeof Polygon> {
	readonly shapeOptions: ConstructorParameters<T>;
	readonly shape?: T;
}

export type ExtractShapeOptions<T extends UnitOptions<typeof Polygon>> =
	NonNullable<T['shapeOptions']['0']>;

export type ExtractShapeType<T extends Unit<typeof Polygon>> = T extends Unit<
	infer S
>
	? S
	: never;

export type GetShapeInstanceType<T extends Unit<typeof Polygon>> = InstanceType<
	ExtractShapeType<T>
>;

export abstract class Unit<T extends typeof Polygon = typeof Polygon>
implements Drawable
{
	shape: InstanceType<T>;

	readonly #groups: Set<Group<this>>;

	constructor(options: UnitOptions<T>) {
		const { shapeOptions, shape: Shape = Rectangle, } = options;
		this.shape = new (Shape as any)(...shapeOptions);
		this.#groups = new Set();
	}

	add(group: Group<this>): void {
		this.#groups.add(group);
	}

	remove(group: Group<this>): void {
		this.#groups.delete(group);
	}

	kill(): void {
		this.#groups.forEach((group) => group.remove(this));
		this.onUnmount();
	}

	draw(display: Display): void {
		this.shape.draw(display);
	}

	abstract update(): void;

	onMount(): void {
		return undefined;
	}

	onUnmount(): void {
		return undefined;
	}
}
