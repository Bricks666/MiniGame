import { Display } from '@/shared/packages/display';
import { Rectangle } from '@/shared/packages/primitives';
import { ScenePart } from '../scene-part';
import { ExtractShapeOptions, Unit, UnitOptions } from '../unit';

export type SceneOptions = ExtractShapeOptions<
	UnitOptions<typeof Rectangle>
> & {
	readonly createParts?: (shape: Rectangle) => Array<ScenePart>;
};

export abstract class Scene extends Unit<typeof Rectangle> {
	protected readonly sceneParts: ScenePart[];

	constructor(options: SceneOptions = {}) {
		const { createParts, ...rest } = options;
		super({
			shapeOptions: [rest],
			shape: Rectangle,
		});

		this.sceneParts = createParts?.(this.shape) ?? [];
	}

	update(): void {
		this.sceneParts.forEach((scenePart) => scenePart.update());
	}

	draw(display: Display): void {
		super.draw(display);
		this.sceneParts.forEach((scenePart) => scenePart.draw(display));
	}
}
