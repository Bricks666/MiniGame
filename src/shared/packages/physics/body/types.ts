import { Body } from './body';
import { GameObject } from '~/game-objects';

export type WithBody<T extends GameObject> = T & {
	readonly body: Body;
};
