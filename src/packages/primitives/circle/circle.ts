import { Display } from '@/packages/display';
import { circleRequestAdapter, RenderVariant } from '@/packages/renderer';
import { Polygon, PolygonOptions } from '../polygon';

export interface CircleOptions extends Pick<PolygonOptions, 'x' | 'y'> {
	readonly radius: number;
	readonly color?: string;
	readonly variant?: RenderVariant;
	readonly strokeWidth?: number;
}

export class Circle extends Polygon {
	radius: number;

	color?: string;

	variant?: RenderVariant;

	strokeWidth?: number;

	constructor(options: CircleOptions) {
		const { radius, x, y, color, strokeWidth, variant, } = options;
		super({
			height: radius ** 2,
			width: radius ** 2,
			x: x - radius,
			y: y - radius,
		});

		this.radius = radius;
		this.color = color;
		this.strokeWidth = strokeWidth;
		this.variant = variant;
	}

	draw(display: Display): void {
		display.draw(circleRequestAdapter(this));
	}

	update(): void {
		return undefined;
	}
}
