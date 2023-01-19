import { SceneMachine } from './scene-machine';
import { Display } from '../display';
import { Key } from './types';
import { rectangleRequestAdapter } from '../renderer';

export interface EngineOptions<K extends Key> {
	readonly display: Display;
	readonly sceneMachine: SceneMachine<K>;
}

export class Engine<K extends Key> {
	readonly display: Display;
	readonly sceneMachine: SceneMachine<K>;

	constructor(options: EngineOptions<K>) {
		const { display, sceneMachine } = options;
		this.display = display;
		this.sceneMachine = sceneMachine;

		this.update = this.update.bind(this);
	}

	start(): void {
		requestAnimationFrame(this.update);
	}

	update(): void {
		this.display.draw(rectangleRequestAdapter(this.display.rect));
		this.sceneMachine.update();
		this.sceneMachine.draw(this.display);
		this.display.update();
		requestAnimationFrame(this.update);
	}
}
