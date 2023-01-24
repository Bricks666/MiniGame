import { Body } from '../body';
import { WithBody } from '../types';
import { GameObject } from '~/game-objects';

export const hasBody = <T extends GameObject>(
	object: T
): object is WithBody<T> => {
	return (
		'body' in object &&
		object.body instanceof Body &&
		Boolean(object.body.isBody)
	);
};
