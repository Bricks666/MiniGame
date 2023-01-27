import { RectangleRenderRequest } from '../types';
import { Rectangle } from '~/sprites';

export const rectangleRequestAdapter = (
	rectangle: Pick<
		Rectangle<any>,
		| 'x'
		| 'y'
		| 'height'
		| 'width'
		| 'variant'
		| 'strokeWidth'
		| 'strokeColor'
		| 'color'
	>
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
		strokeColor: rectangle.strokeColor as never,
	};
};
