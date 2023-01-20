import { Display } from '@/shared/packages/display';
import { Polygon } from '@/shared/packages/primitives';
import { Listener, EventEmitter } from '../event-emitter';
import { Events, MouseEvents } from './types';

export class DOMEventEmitter extends EventEmitter {
	#display!: Display;

	on(type: Events, listener: Listener): globalThis.VoidFunction {
		const handler = (evt: Event) => {
			if (!this.#display) {
				return;
			}
			listener(evt);
		};

		document.addEventListener(type, handler);

		return () => {
			document.removeEventListener(type, handler);
		};
	}

	setDisplay(display: Display): void {
		this.#display = display;
	}

	/**
	 * TODO: Исправить поведение mouseleave
	 */
	onMouseEvent(type: MouseEvents, polygon: Polygon, listener: Listener): void {
		const eventListener = (evt: MouseEvent) => {
			if (evt.target !== this.#display.canvas) {
				return;
			}

			const isCollide = polygon.collidePoint({
				x: evt.x - this.#display.canvas.offsetLeft,
				y: evt.y - this.#display.canvas.offsetTop,
			});

			if (isCollide) {
				listener();
			}
		};

		this.on(type, eventListener as Listener);
	}
}

export const domEventEmitter = new DOMEventEmitter();
