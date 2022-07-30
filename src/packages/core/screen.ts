import { Rect, RectOptions } from './rect';
import { Size } from './types';

export class Screen {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;

	rect: Rect;
	private readonly paintRequestSprite: Set<PaintRequests>;

	private static readonly methodPaintMap: Record<RequestType, PaintMethods> = {
		text: 'fillText',
		color: 'fillRect',
		sprite: 'drawImage',
	};

	constructor(options: ScreenOptions = {}) {
		const { height = 0, width = 0, container = document.body, } = options;
		this.rect = new Rect({
			height,
			width,
			x: 0,
			y: 0,
		});
		this.canvas = document.createElement('canvas');
		this.paintRequestSprite = new Set();
		container.append(this.canvas);
		this.context = this.canvas.getContext('2d')!;
		this.#basicStylingCanvas();
	}

	#basicStylingCanvas(): void {
		this.canvas.width = this.rect.width;
		this.canvas.height = this.rect.height;
		this.canvas.setAttribute(
			'style',
			'display: block; margin: 120px auto; border: 1px solid black;'
		);
		this.context.fillStyle = '#ffffff';
		this.context.font = '32px Roboto';
	}

	fill(rect: RectOptions, color: string): void {
		this.paintRequestSprite.add({
			type: 'color',
			rect,
			value: color,
		});
	}

	print(rect: RectOptions, text: string): void {
		this.paintRequestSprite.add({
			type: 'text',
			rect,
			value: text,
		});
	}

	draw(rect: RectOptions, image: CanvasImageSource): void {
		this.paintRequestSprite.add({
			type: 'sprite',
			rect,
			value: image,
		});
	}

	update(): void {
		this.paintRequestSprite.forEach((request) => {
			const { rect, type, value, } = request;
			if (!Rect.collideRect(this.rect, rect)) {
				return;
			}

			const methodName = Screen.methodPaintMap[type];
			console.log(methodName);
			let args: any[] = [];
			switch (type) {
				case 'color': {
					this.context.fillStyle = value;
					args = [rect.x, rect.y, rect.width, rect.height,];
					break;
				}
				case 'sprite': {
					args = [
						value,
						rect.x,
						rect.y,
						rect.width,
						rect.height,
					];
					break;
				}
				case 'text': {
					args = [value, rect.x, rect.y, rect.width,];
					break;
				}
				default: {
					break;
				}
			}

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			/** @ts-ignore */
			this.context[methodName](...args);
			console.log(args);
		});
		this.paintRequestSprite.clear();
	}
}

export const setTitle = (title: string): void => {
	document.head.title = title;
};

export const setIcon = (icon: string): void => {
	let link = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
	if (link) {
		link.href = icon;
		return;
	}

	link = document.createElement('link');
	link.href = icon;
	link.rel = 'icon';

	document.head.append(link);
};

export interface ScreenOptions extends Partial<Size> {
	readonly container?: HTMLElement;
}

export type RequestType = 'text' | 'sprite' | 'color';

export type PaintMethods = Extract<
	keyof CanvasRenderingContext2D,
	'fillText' | 'drawImage' | 'fillRect'
>;

export interface BasePaintRequest<T extends RequestType, D> {
	readonly type: T;
	readonly rect: RectOptions;
	readonly value: D;
}

export type PaintRequests =
	| BasePaintRequest<'text', string>
	| BasePaintRequest<'sprite', CanvasImageSource>
	| BasePaintRequest<'color', string>;
