import { Rect } from '@/packages/core';
import { createCanvas } from '@/utils';

export interface ScreenOptions {
	readonly width: number;
	readonly height: number;
	readonly container?: HTMLElement;
}

export class Screen {
	private height: number;
	private width: number;
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;

	constructor(options: ScreenOptions) {
		const { height, width, container = document.body } = options;
		this.width = width;
		this.height = height;
		this.canvas = createCanvas();
		container.append(this.canvas);
		this.context = this.canvas.getContext('2d')!;

		this.#basicStylingCanvas();
	}

	#basicStylingCanvas(): void {
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.canvas.setAttribute('style', 'display: block; margin: 120px auto; border: 1px solid black;');
		this.context.fillStyle = '#ffffff';
		this.context.font = '32px Roboto';
	}

	fill(color: string): void {
		this.context.fillStyle = color;
		this.context.fillRect(0, 0, this.width, this.height);
	}

	print(rect: Rect, text: string): void {
		this.context.fillText(text, rect.x, rect.y);
	}

	draw(rect: Rect, image: CanvasImageSource) {
		this.context.drawImage(image, rect.x, rect.y);
	}
}
