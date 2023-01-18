import { PaintRequest, RectProperties } from '../../core';

export interface SpriteRequestAdapterParams {
	readonly rect: RectProperties;
	readonly image: CanvasImageSource;
}

export const spriteRequestAdapter = (
	params: SpriteRequestAdapterParams
): PaintRequest<'sprite'> => {
	const { image, rect } = params;
	return {
		type: 'sprite',
		rect,
		args: [image, rect.x, rect.y, rect.width, rect.height] as any,
	};
};
