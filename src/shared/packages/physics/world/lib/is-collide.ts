import { Body } from '../../body';

export const isCollide = (body1: Body, body2: Body): boolean => {
	if (body1.endX < body2.x || body1.x > body2.endX) {
		return false;
	}

	// eslint-disable-next-line sonarjs/prefer-single-boolean-return
	if (body1.endY < body2.y || body1.y > body2.endY) {
		return false;
	}

	return true;
};
