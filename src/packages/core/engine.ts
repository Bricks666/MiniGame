import { SceneMachine, SceneMachineOptions } from './scene-machine';
import { Screen } from './screen';
import { Key } from './types';

export interface EngineOptions<K extends Key> extends SceneMachineOptions<K> {
	readonly screen: Screen;
}

export class Engine<K extends Key> {
	readonly screen: Screen;
	readonly sceneMachine: SceneMachine<K>;

	constructor(options: EngineOptions<K>) {
		const { screen, ...sceneMachineOptions } = options;
		this.screen = screen;
		this.sceneMachine = new SceneMachine(sceneMachineOptions);
	}

	start() {
		requestAnimationFrame(this.update.bind(this));
	}

	update() {
		requestAnimationFrame(this.update.bind(this));
	}
}
