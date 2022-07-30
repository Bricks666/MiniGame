import { setTextStyle, TextProperties } from '@/packages/core/Text';
import { Rect, RectProperties } from '../rect';
import { Size } from '../types';
import { PaintMethods, PaintRequests, RequestType } from './types';

export interface ScreenOptions extends Partial<Size> {
	readonly container?: HTMLElement;
	readonly style?: Partial<CSSStyleDeclaration>;
}

export const methodPaintMap: Record<RequestType, PaintMethods> = {
	text: 'fillText',
	color: 'fillRect',
	sprite: 'drawImage',
};

export class Screen {
	#rect: Rect;

	readonly #canvas: HTMLCanvasElement;
	readonly #context: CanvasRenderingContext2D;
	readonly #paintRequestSprite: Set<PaintRequests>;

	constructor(options: ScreenOptions = {}) {
		const {
			height = 0, width = 0, container = document.body, style,
		} = options;

		this.#rect = new Rect({
			height,
			width,
			x: 0,
			y: 0,
		});

		this.#paintRequestSprite = new Set();

		this.#canvas = document.createElement('canvas');
		container.append(this.#canvas);
		this.#context = this.#canvas.getContext('2d')!;
		this.#basicStylingCanvas(style);
	}

	fill(rect: RectProperties, color: string): void {
		this.#paintRequestSprite.add({
			type: 'color',
			rect,
			value: color,
		});
	}

	print(rect: RectProperties, value: TextProperties): void {
		this.#paintRequestSprite.add({
			type: 'text',
			rect,
			value,
		});
	}

	draw(rect: RectProperties, image: CanvasImageSource): void {
		this.#paintRequestSprite.add({
			type: 'sprite',
			rect,
			value: image,
		});
	}

	update(): void {
		this.#paintRequestSprite.forEach((request) => {
			const { rect, type, value, } = request;
			if (!Rect.collideRect(this.#rect, rect)) {
				return;
			}

			const methodName = methodPaintMap[type];
			let args: any[];
			switch (type) {
				case 'color': {
					this.#context.fillStyle = value;
					args = [rect.x, rect.y, rect.width, rect.height,];
					break;
				}
				case 'sprite': {
					args = [value, rect.x, rect.y, rect.width, rect.height,];
					break;
				}
				case 'text': {
					setTextStyle(this.#context, value);
					args = [value.text, rect.x, rect.y, rect.width,];
					break;
				}
				default: {
					args = [];
					break;
				}
			}
			try {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				/** @ts-ignore */
				this.#context[methodName](...args);
			} catch (error) {
				this.#context.restore();
			}
		});
		this.#context.save();
		this.#paintRequestSprite.clear();
	}

	#basicStylingCanvas(style?: Partial<CSSStyleDeclaration>): void {
		this.#canvas.width = this.#rect.width;
		this.#canvas.height = this.#rect.height;
		this.#context.textBaseline = 'top';
		Object.assign(this.#canvas.style, style);
	}
}
