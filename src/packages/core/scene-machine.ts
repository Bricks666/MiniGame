import { eventBus } from './eventBus';
import { Scene } from './scene';
import { Screen } from './Screen';
import { Key, StateDict, StateMachine, StateMachineOptions } from './types';

export type SceneDict<K extends Key> = StateDict<K, Scene>;

export type SceneMachineOptions<K extends Key> = StateMachineOptions<K, Scene>;

export class SceneMachine<K extends Key> implements StateMachine<K, Scene> {
	currentState: Scene;
	states: SceneDict<K>;

	constructor(options: SceneMachineOptions<K>) {
		const { states, stateSceneKey } = options;
		this.states = states;
		this.currentState = this.states[stateSceneKey];

		this.changeState = this.changeState.bind(this);
		this.#subscribe();
	}

	changeState(stateKey: K): void {
		console.log(stateKey);
		this.currentState = this.states[stateKey];
	}

	draw(screen: Screen): void {
		this.currentState.draw(screen);
	}

	update(): void {
		this.currentState.update();
	}

	#subscribe(): void {
		eventBus.onChangeScene<K>(this.changeState);
	}
}
