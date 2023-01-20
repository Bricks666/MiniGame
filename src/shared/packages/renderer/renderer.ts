import {
	CircleRenderRequest,
	ImageRenderRequest,
	RectangleRenderRequest,
	TextRenderRequest,
	RenderRequest
} from './types';

export interface RendererOptions {
	readonly context: CanvasRenderingContext2D;
}

export class Renderer {
	readonly #sequence: Set<RenderRequest>;

	readonly #context: CanvasRenderingContext2D;

	constructor(options: RendererOptions) {
		const { context, } = options;
		this.#context = context;
		this.#sequence = new Set();
	}

	add(request: RenderRequest) {
		this.#sequence.add(request);
	}

	#renderImage(request: ImageRenderRequest): void {
		const { image, x, y, height, width, } = request;
		this.#context.drawImage(image, x, y, width, height);
	}

	#renderText(request: TextRenderRequest): void {
		const {
			text,
			align,
			baseline,
			font,
			color,
			x,
			y,
			maxWidth,
			strokeWidth,
			variant,
		} = request;
		if (align) {
			this.#context.textAlign = align;
		}
		if (font) {
			this.#context.font = font;
		}
		if (baseline) {
			this.#context.textBaseline = baseline;
		}

		if (variant !== 'stroke') {
			this.#context.fillStyle = color || 'black';
			this.#context.fillText(text, x, y, maxWidth);
		}
		if (variant !== 'fill') {
			this.#context.strokeStyle = color || 'black';
			this.#context.lineWidth = strokeWidth;
			this.#context.strokeText(text, x, y, maxWidth);
		}
	}

	#renderRect(request: RectangleRenderRequest): void {
		const {
			color,
			height,
			width,
			x,
			y,
			strokeColor = 'black',
			strokeWidth = 1,
			variant = 'fill',
		} = request;

		if (variant !== 'stroke') {
			this.#context.fillStyle = color;
			this.#context.fillRect(x, y, width, height);
		}
		if (variant !== 'fill') {
			this.#context.strokeStyle = strokeColor;
			this.#context.lineWidth = strokeWidth;
			this.#context.strokeRect(x, y, width, height);
		}
	}

	#renderCircle(request: CircleRenderRequest): void {
		const { color, x, y, radius, strokeWidth, variant, } = request;

		const circle = new Path2D();
		circle.arc(x, y, radius, 0, Math.PI * 2, false);
		circle.closePath();

		if (variant !== 'stroke') {
			this.#context.fillStyle = color;
			this.#context.fill(circle);
		}

		if (variant !== 'fill') {
			this.#context.strokeStyle = color;
			this.#context.lineWidth = strokeWidth;
			this.#context.stroke(circle);
		}
	}

	render(): void {
		this.#sequence.forEach((request) => {
			switch (request.type) {
				case 'circle':
					this.#renderCircle(request);
					break;
				case 'image':
					this.#renderImage(request);
					break;
				case 'rectangle':
					this.#renderRect(request);
					break;
				case 'text':
					this.#renderText(request);
					break;
				default:
					break;
			}
		});

		this.#sequence.clear();
	}
}
