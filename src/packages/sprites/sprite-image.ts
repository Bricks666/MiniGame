import { Rectangle } from '../primitives';
import { imageLoader } from './lib';

export class SpriteImage {
	rect: Rectangle;
	image!: HTMLImageElement;
	isReady: boolean;

	constructor(src = '') {
		this.rect = new Rectangle();
		this.isReady = false;
		imageLoader(src)
			.then((image) => {
				this.image = image;
				this.rect.width = image.width;
				this.rect.height = image.height;
			})
			.finally(() => {
				this.isReady = true;
			});
	}
}
