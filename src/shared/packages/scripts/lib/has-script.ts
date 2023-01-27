import { GameObject } from '../../game-objects';
import { Script } from '../../scripts';

export type WithScript<T extends GameObject> = T & {
	readonly script: Script<T>;
};

export const hasScript = <T extends GameObject>(
	object: T
): object is WithScript<T> => {
	return 'script' in object && object.script instanceof Script;
};
