import { Rectangle } from '../../primitives';
import { RectangleRenderRequest } from '../types';

export const rectangleRequestAdapter = (
	rectangle: Rectangle
): RectangleRenderRequest => {
	return {
		x: rectangle.x,
		y: rectangle.y,
		height: rectangle.height,
		width: rectangle.width,
		color: rectangle.color || 'transparent',
		type: 'rectangle',
		variant: rectangle.variant || 'fill',
		strokeWidth: rectangle.strokeWidth as never,
	};
};
