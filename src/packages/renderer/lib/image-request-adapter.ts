import { Image } from '../../primitives';
import { ImageRenderRequest } from '../types';

export const imageRequestAdapter = (image: Image): ImageRenderRequest => {
	return {
		x: image.x,
		y: image.y,
		height: image.height,
		width: image.width,
		type: 'image',
		image: image.image,
	};
};
