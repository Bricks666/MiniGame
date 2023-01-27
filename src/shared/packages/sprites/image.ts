import { GameObject } from '../game-objects';
import { Sprite, SpriteOptions } from './sprite';
import { Display } from '~/display';
import { imageRequestAdapter } from '~/renderer';

export interface ImageOptions<T extends GameObject> extends SpriteOptions<T> {
	readonly src: string;
}

export class Image<T extends GameObject> extends Sprite<T> {
	readonly image: HTMLImageElement;

	constructor(options: ImageOptions<T>) {
		const { src, ...rest } = options;
		super(rest);
		this.image = new globalThis.Image(this.width, this.height);
		this.image.src = src;
	}

	render(display: Display) {
		display.draw(imageRequestAdapter(this));
	}
}
