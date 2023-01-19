import { Image, ImageOptions } from '@/packages/primitives';
import { Unit } from '../unit';

export interface SpriteOptions extends ImageOptions {
	readonly src: string;
}

export class Sprite extends Unit<typeof Image> {
	constructor(options: SpriteOptions) {
		super({ shapeOptions: [options], shape: Image });
	}

	update<R extends Array<unknown>>(..._args: R): void {}
}
