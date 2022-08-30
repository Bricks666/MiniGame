import { Listener } from './types';

export abstract class EventEmitter {
	abstract on(type: string, listener: Listener): VoidFunction;
}
