import { Display } from '@/shared/packages/display';
import { imageRequestAdapter } from '@/shared/packages/renderer';
import { Polygon, PolygonOptions } from '../polygon';

export interface ImageOptions extends PolygonOptions {
	readonly src: string;
}

export class Image extends Polygon {
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
