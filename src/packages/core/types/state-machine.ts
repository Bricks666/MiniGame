export type Key = string | number;

export type StateDict<K extends Key, T> = {
	[key in K]: T;
};

export interface StateMachineOptions<K extends Key, T> {
	readonly states: StateDict<K, T>;
	readonly stateSceneKey: K;
}

export declare class StateMachine<K extends Key, T> {
	constructor(options: StateMachineOptions<K, T>);
	currentState: T;
	readonly states: StateDict<K, T>;
	changeState(stateKey: K): void;
}
