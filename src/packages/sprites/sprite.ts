import { Unit, UnitOptions } from '../core';
import { SpriteImage } from './sprite-image';
import { Display } from '../display';

export interface SpriteOptions extends UnitOptions {
	readonly src: string;
}

export class Sprite extends Unit {
	image: SpriteImage;

	constructor(options: SpriteOptions) {
		const { src, rect } = options;
		super({ rect });
		this.image = new SpriteImage(src);
	}

	update<R extends Array<unknown>>(..._args: R): void {}

	draw<R extends any>(screen: Display, ..._args: R[]): void {
		screen.draw(
			spriteRequestAdapter({
				rect: this.rect,
				image: this.image.image,
			})
		);
	}
}
