import { Image } from '../../primitives';
import { ImageRenderRequest } from '../types';

export const imageRequestAdapter = (
	image: Pick<Image, 'x' | 'y' | 'height' | 'width' | 'image'>
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
