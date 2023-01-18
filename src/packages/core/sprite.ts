import { Screen } from './Screen';
import { SpriteImage } from './sprite-image';
import { Unit, UnitOptions } from './unit';

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

	draw<R extends any>(screen: Screen, ..._args: R[]): void {
		screen.draw(this.rect, this.image.image);
	}
}
