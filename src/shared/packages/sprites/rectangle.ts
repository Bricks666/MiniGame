import { GameObject } from '../game-objects';
import { Sprite, SpriteOptions } from './sprite';
import { Display } from '~/display';
import { rectangleRequestAdapter, RenderVariant } from '~/renderer';

export interface RectangleOptions<T extends GameObject>
	extends SpriteOptions<T> {
	readonly color?: string;
	readonly variant?: RenderVariant;
	readonly strokeWidth?: number;
	readonly strokeColor?: string;
	readonly padding?: number;
}

export type RectangleCoordinates = Omit<
	RectangleOptions<GameObject>,
	'color' | 'variant' | 'strokeWidth'
>;

export class Rectangle<T extends GameObject> extends Sprite<T> {
	color?: string;

	variant?: RenderVariant;

	strokeColor?: string;

	strokeWidth: number;

	padding: number;

	constructor(options: RectangleOptions<T>) {
		const {
			color,
			variant,
			strokeColor,
			strokeWidth = 0,
			padding = 0,
			...rest
		} = options;
		super(rest);
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

	render(display: Display): void {
		display.draw(rectangleRequestAdapter(this));
	}
}
