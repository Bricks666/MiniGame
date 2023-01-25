import { Unit, UnitOptions } from './unit';
import { Display } from '~/display';
import { imageRequestAdapter } from '~/renderer';

export interface SpriteOptions extends UnitOptions {
	readonly src: string;
}

export class Sprite extends Unit {
	readonly image: HTMLImageElement;

	constructor(options: SpriteOptions) {
		const { src, ...rest } = options;
		super(rest);
		this.image = new Image(this.width, this.height);
		this.image.src = src;
	}

	draw(display: Display) {
		display.draw(imageRequestAdapter(this));
	}
}
