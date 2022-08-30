import { EventEmitter, Listener } from '../eventEmitter';
import { Key } from '../types';
import { EVENTS } from './events';
import { ChangeSceneListeners } from './types';

export class EventBus extends EventEmitter {
	private listeners: Map<string, Listener[]>;

	constructor() {
		super();
		this.listeners = new Map();
	}

	on(type: string, listener: Listener): VoidFunction {
		if (!this.listeners.get(type)) {
			this.listeners.set(type, []);
		}
		this.listeners.get(type)?.push(listener);

		return () => {
			this.listeners.set(
				type,
				this.listeners.get(type)!.filter((l) => l !== listener)
			);
		};
	}

	emit(type: string, ...args: any[]): void {
		const listeners = this.listeners.get(type);
		if (!listeners) {
			return;
		}

		listeners.forEach((listener) => listener(...args));
	}

	onChangeScene<K extends Key>(
		listener: ChangeSceneListeners<K>
	): VoidFunction {
		return this.on(EVENTS.CHANGE_SCENE, listener);
	}
	emitChangeScene(scene: string): void {
		this.emit(EVENTS.CHANGE_SCENE, scene);
	}
}

export const eventBus = new EventBus();
