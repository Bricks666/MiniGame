import { Group } from './group';
import { Display } from '../display';
import { ExtractShapeOptions, Unit, UnitOptions } from './unit';
import { Polygon, Rectangle } from '../primitives';

export type ScenePartOptions = ExtractShapeOptions<
	UnitOptions<typeof Rectangle>
>;

export class ScenePart<
	T extends Unit<typeof Polygon> = Unit<typeof Polygon>
> extends Unit<typeof Rectangle> {
	protected readonly units: Group<T>;

	constructor(options: ScenePartOptions) {
		super({ shapeOptions: [options], shape: Rectangle });
		this.units = new Group();
	}

	update(): void {
		this.units.update();
	}

	draw(display: Display): void {
		super.draw(display);
		this.units.draw(display);
	}
}
