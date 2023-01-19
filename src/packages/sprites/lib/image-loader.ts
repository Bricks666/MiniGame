import { baseLoader } from '../../core';

export const imageLoader = (src: string): Promise<HTMLImageElement> => {
	return baseLoader(Image, src);
};
