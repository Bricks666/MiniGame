import { Coordinate } from '../../core';
import { rectangleRequestAdapter, RenderVariant } from '../../renderer';
import { Display } from '../../display';
import { Polygon, PolygonOptions } from '../polygon';
import { collide } from './lib';

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

	collideRect(rect: Rectangle): boolean {
		return Rectangle.collideRect(this, rect);
	}

	collidePoint(point: Coordinate): boolean {
		return Rectangle.collidePoint(this, point);
	}

	draw(display: Display): void {
		display.draw(rectangleRequestAdapter(this));
	}

	update(): void {}

	static collideRect(
		rect1: RectangleCoordinates,
		rect2: RectangleCoordinates
	): boolean {
		const isCollideX: boolean = collide(
			rect1.x,
			rect1.width,
			rect2.x,
			rect2.width
		);
		const isCollideY: boolean = collide(
			rect1.y,
			rect1.height,
			rect2.y,
			rect2.height
		);
		return isCollideX && isCollideY;
	}

	static collidePoint(rect1: RectangleCoordinates, point: Coordinate): boolean {
		const isCollideX: boolean = collide(rect1.x, rect1.width, point.x, 0);
		const isCollideY: boolean = collide(rect1.y, rect1.height, point.y, 0);
		return isCollideX && isCollideY;
	}
}
