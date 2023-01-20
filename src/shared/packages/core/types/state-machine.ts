export type Key = string | number;

export type StateDict<K extends Key, T> = {
	[key in K]: T;
};

export interface StateMachineOptions<K extends Key, T> {
	readonly states: StateDict<K, T>;
}

export abstract class StateMachine<K extends Key, T> {
	readonly states: StateDict<K, T>;

	current: T | null;

	constructor(options: StateMachineOptions<K, T>) {
		const { states, } = options;
		this.states = states;
		this.current = null;
	}

	changeState(key: K): void {
		this.current = this.states[key];
	}
}
