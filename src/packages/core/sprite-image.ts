import { imageLoader } from './loaders';
import { Rect } from './rect';

export class SpriteImage {
	rect: Rect;
	image: HTMLImageElement;
	isReady: boolean;

	constructor(src = '') {
		this.rect = new Rect();
		this.image = new Image();
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
