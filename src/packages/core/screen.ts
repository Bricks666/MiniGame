import { RectOptions } from './rect';
import { Size } from './types';

export interface ScreenOptions extends Size {
	readonly container?: HTMLElement;
}

export class Screen {
	private height: number;
	private width: number;
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;

	constructor(options: ScreenOptions) {
		const { height, width, container = document.body, } = options;
		this.width = width;
		this.height = height;
		this.canvas = document.createElement('canvas');
		container.append(this.canvas);
		this.context = this.canvas.getContext('2d')!;
		this.#basicStylingCanvas();
	}

	#basicStylingCanvas(): void {
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.setAttribute(
			'style',
			'display: block; margin: 120px auto; border: 1px solid black;'
		);
		this.context.fillStyle = '#ffffff';
		this.context.font = '32px Roboto';
	}

	fill(rect: RectOptions, color: string): void {
		this.context.fillStyle = color;
		this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
	}

	print(rect: RectOptions, text: string): void {
		this.context.fillText(text, rect.x, rect.y, rect.width);
	}

	draw(rect: RectOptions, image: CanvasImageSource) {
		this.context.drawImage(image, rect.x, rect.y, rect.width, rect.height);
	}
}
