import { Display } from '../../display';
import { imageRequestAdapter } from '../../renderer';
import { GameObject, GameObjectOptions } from '../game-object';

export interface SpriteOptions extends GameObjectOptions {
	readonly src: string;
}

export class Sprite extends GameObject {
	image: HTMLImageElement;

	constructor(options: SpriteOptions) {
		const { src, ...rest } = options;
		super(rest);
		this.image = new globalThis.Image(this.width, this.height);
		this.image.src = src;
	}

	draw(display: Display): void {
		display.draw(imageRequestAdapter(this));
	}
}
