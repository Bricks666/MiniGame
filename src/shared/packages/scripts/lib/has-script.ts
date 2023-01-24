import { GameObject } from '../../game-objects';
import { Script } from '../../scripts';

export const hasScript = <T extends GameObject>(
	object: T
): object is T & {
	readonly script: Script<T>;
} => {
	return 'script' in object && object.script instanceof Script;
};
