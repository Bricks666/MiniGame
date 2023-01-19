import { Display } from '@/shared/packages/display';
import {
	rectangleRequestAdapter,
	RenderVariant
} from '@/shared/packages/renderer';
import { Polygon, PolygonOptions } from '../polygon';

export interface RectangleOptions extends PolygonOptions {
	readonly color?: string;
	readonly variant: RenderVariant;
	readonly strokeWidth: number;
}

export type RectangleCoordinates = Omit<
	RectangleOptions,
	'color' | 'variant' | 'strokeWidth'
>;

export class Rectangle extends Polygon {
	color?: string;

	strokeWidth?: number;

	variant?: RenderVariant;

	constructor(options: Partial<RectangleOptions> = {}) {
		const {
			height = 0,
			width = 0,
			x = 0,
			y = 0,
			color,
			strokeWidth,
			variant,
		} = options;
		super({
			height,
			width,
			x,
			y,
		});
		this.color = color;
		this.variant = variant;
		this.strokeWidth = strokeWidth;
	}

	draw(display: Display): void {
		display.draw(rectangleRequestAdapter(this));
	}

	update(): void {
		return undefined;
	}
}
