import EventEmitter from 'eventemitter3';
import { Key, StateDict, StateMachine, StateMachineOptions } from './types';
import { Display } from '~/display';
import { Scene } from '~/scene';
import { Drawable } from '~/types';

export type SceneDict<K extends Key> = StateDict<K, Scene>;

export type SceneMachineOptions<K extends Key> = StateMachineOptions<K, Scene>;

export class SceneMachine<K extends Key>
	extends StateMachine<K, Scene>
	implements Drawable
{
	readonly events: EventEmitter;

	constructor(options: SceneMachineOptions<K>) {
		super(options);
		this.events = new EventEmitter();
	}

	changeState(key: K): void {
		console.log(key);
		this.current?.destroy();
		super.changeState(key);
		if (this.current?.isInit === false) {
			this.current.init();
		}
		this.current?.start();
	}

	draw(display: Display): void {
		this.current?.draw(display);
	}

	update(): void {
		this.current?.update();
	}
}
