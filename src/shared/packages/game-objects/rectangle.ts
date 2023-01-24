import { Display } from '@/shared/packages/display';
import {
	rectangleRequestAdapter,
	RenderVariant
} from '@/shared/packages/renderer';
import { GameObject, GameObjectOptions } from './game-object';

export interface RectangleOptions extends GameObjectOptions {
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

export class Rectangle extends GameObject {
	color?: string;

	variant?: RenderVariant;

	strokeColor?: string;

	strokeWidth: number;

	padding: number;

	constructor(options: RectangleOptions) {
		const {
			bodyOptions: body,
			height,
			position,
			width,
			color,
			variant,
			strokeColor,
			strokeWidth = 0,
			padding = 0,
		} = options;
		super({
			bodyOptions: body,
			height,
			position,
			width,
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
