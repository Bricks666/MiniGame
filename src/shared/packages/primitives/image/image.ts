import { Display } from '@/shared/packages/display';
import { imageRequestAdapter } from '@/shared/packages/renderer';
import { Rectangle, RectangleOptions } from '../rectangle';

export interface ImageOptions extends Omit<RectangleOptions, 'color'> {
	readonly src: string;
}

export class Image extends Rectangle {
	image: HTMLImageElement;

	constructor(options: ImageOptions) {
		const { src, ...rest } = options;
		super(rest);
		this.image = new globalThis.Image(this.width, this.height);
		this.image.src = src;
	}

	draw(display: Display): void {
		display.draw(imageRequestAdapter(this));
	}

	update(): void {
		return undefined;
	}
}
