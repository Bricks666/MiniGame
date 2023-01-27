import { ImageRenderRequest } from '../types';
import { Image } from '~/sprites';

export const imageRequestAdapter = (
	image: Pick<Image<any>, 'x' | 'y' | 'height' | 'width' | 'image'>
): ImageRenderRequest => {
	return {
		x: image.x,
		y: image.y,
		height: image.height,
		width: image.width,
		type: 'image',
		image: image.image,
	};
};
