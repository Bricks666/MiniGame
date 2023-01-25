import EventEmitter from 'eventemitter3';
import { SceneMachine } from './scene-machine';
import { Display } from '~/display';
import { eventBus, EVENTS } from '~/events';
import { rectangleRequestAdapter } from '~/renderer';
import { Scene } from '~/scene';
import { Timer } from '~/time';

export interface EngineOptions {
	readonly display: Display;
	readonly scenes: Record<string, Scene>;
}

export class Engine {
	readonly display: Display;

	readonly sceneMachine: SceneMachine<string>;

	readonly events: EventEmitter;

	constructor(options: EngineOptions) {
		const { display, scenes, } = options;
		this.display = display;
		this.sceneMachine = new SceneMachine({
			states: scenes,
		});
		this.events = new EventEmitter();

		this.update = this.update.bind(this);

		eventBus.on(
			EVENTS.CHANGE_SCENE,
			this.sceneMachine.changeState,
			this.sceneMachine
		);
	}

	start(): void {
		requestAnimationFrame(this.update);
	}

	update(): void {
		Timer.tick();
		this.display.draw(rectangleRequestAdapter(this.display.rect));
		this.sceneMachine.update();
		this.sceneMachine.draw(this.display);
		this.display.update();
		requestAnimationFrame(this.update);
	}
}
