import { RectProperties } from '../../rect';
import { PaintRequest } from '../types';

export interface FillRequiresAdapterParams {
	readonly rect: RectProperties;
	readonly color: string;
}

export const fillRequestAdapter = (
	params: FillRequiresAdapterParams
): PaintRequest<'color'> => {
	const { color, rect } = params;
	return {
		type: 'color',
		prepareContext(context) {
			context.fillStyle = color;
		},
		args: [rect.x, rect.y, rect.width, rect.height],
		rect,
	};
};
