import { Rectangle, RectangleOptions } from '~/primitives';
import { Renderer, RenderRequest } from '~/renderer';

export interface ScreenOptions extends Partial<RectangleOptions> {
	readonly container?: HTMLElement;
	readonly style?: Partial<CSSStyleDeclaration>;
}

export class Display {
	rect: Rectangle;

	readonly #canvas: HTMLCanvasElement;

	readonly #renderer: Renderer;

	constructor(options: ScreenOptions = {}) {
		const { height = 0, width = 0, container = document.body, style, } = options;

		this.rect = new Rectangle({
			height,
			width,
			x: 0,
			y: 0,
		});

		this.#canvas = document.createElement('canvas');
		container.append(this.#canvas);
		const context = this.#canvas.getContext('2d')!;

		this.#renderer = new Renderer({
			context,
		});

		this.#basicStylingCanvas(style);
	}

	get canvas() {
		return this.#canvas;
	}

	draw(request: RenderRequest): void {
		this.#renderer.add(request);
	}

	update(): void {
		this.#renderer.render();
	}

	#basicStylingCanvas(style?: Partial<CSSStyleDeclaration>): void {
		this.#canvas.width = this.rect.width;
		this.#canvas.height = this.rect.height;
		Object.assign(this.#canvas.style, style);
	}
}
