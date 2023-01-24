import { Polygon, PolygonOptions } from '../polygon';
import { Display } from '~/display';
import { rectangleRequestAdapter, RenderVariant } from '~/renderer';

export interface RectangleOptions extends PolygonOptions {
	readonly color?: string;
	readonly variant?: RenderVariant;
	readonly strokeWidth?: number;
	readonly strokeColor?: string;
	readonly padding?: number;
}

export type RectangleCoordinates = Omit<
	RectangleOptions,
	'color' | 'variant' | 'strokeWidth'
>;

export class Rectangle extends Polygon {
	color?: string;

	variant?: RenderVariant;

	strokeColor?: string;

	strokeWidth: number;

	padding: number;

	constructor(options: Partial<RectangleOptions> = {}) {
		const {
			height = 0,
			width = 0,
			x = 0,
			y = 0,
			color,
			variant,
			strokeColor,
			strokeWidth = 0,
			padding = 0,
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
		this.strokeColor = strokeColor;
		this.padding = padding;
	}

	get innerWidth(): number {
		return this.width - this.strokeWidth * 2 - this.padding * 2;
	}

	get innerHeight(): number {
		return this.height - this.strokeWidth * 2 - this.padding * 2;
	}

	get innerRight(): number {
		return this.innerLeft + this.innerWidth;
	}

	get innerBottom(): number {
		return this.innerTop + this.innerHeight;
	}

	get innerLeft(): number {
		return this.x + this.strokeWidth + this.padding;
	}

	get innerTop(): number {
		return this.y + this.strokeWidth + this.padding;
	}

	draw(display: Display): void {
		display.draw(rectangleRequestAdapter(this));
	}

	update(): void {
		return undefined;
	}
}
