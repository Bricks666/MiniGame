import { Rect, RectProperties } from '../rect';
import { Size } from '../types';
import { PaintMethods, PaintRequest, PaintType } from './types';

export interface ScreenOptions extends Partial<Size> {
	readonly container?: HTMLElement;
	readonly style?: Partial<CSSStyleDeclaration>;
}

export const methodPaintMap: Record<PaintType, PaintMethods> = {
	text: 'fillText',
	color: 'fillRect',
	sprite: 'drawImage',
};

export class Screen {
	rect: Rect;

	readonly #canvas: HTMLCanvasElement;
	readonly #context: CanvasRenderingContext2D;
	readonly #paintRequestSprite: Set<PaintRequest<PaintType>>;

	constructor(options: ScreenOptions = {}) {
		const { height = 0, width = 0, container = document.body, style } = options;

		this.rect = new Rect({
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

	get canvas() {
		return this.#canvas;
	}

	draw<T extends PaintType>(request: PaintRequest<T>) {
		this.#paintRequestSprite.add(request);
	}

	update(): void {
		this.#paintRequestSprite.forEach((request) => {
			const { args, type, prepareContext, rect } = request;
			if (!Rect.collideRect(this.rect, rect)) {
				return;
			}

			if (prepareContext) {
				prepareContext(this.#context);
			}

			const methodName = methodPaintMap[type];

			try {
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
		this.#canvas.width = this.rect.width;
		this.#canvas.height = this.rect.height;
		this.#context.textBaseline = 'top';
		Object.assign(this.#canvas.style, style);
	}
}
