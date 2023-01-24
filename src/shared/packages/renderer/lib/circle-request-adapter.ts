import { CircleRenderRequest } from '../types';
import { Circle } from '~/primitives';

export const circleRequestAdapter = (circle: Circle): CircleRenderRequest => {
	return {
		type: 'circle',
		radius: circle.radius,
		x: circle.x,
		y: circle.y,
		variant: circle.variant || 'fill',
		color: circle.color || 'black',
		strokeWidth: circle.strokeWidth as never,
	};
};
