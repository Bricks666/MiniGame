import { baseLoader } from './base-loader';

export const imageLoader = (src: string): Promise<HTMLImageElement> => {
	return baseLoader(Image, src);
};
