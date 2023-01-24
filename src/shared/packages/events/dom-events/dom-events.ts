import { Listener, EventEmitter } from '../event-emitter';
import { Events, KeyboardEvents, MouseEvents } from './types';
import { Display } from '~/display';

export class DOMEvents extends EventEmitter {
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
	onMouseEvent(type: MouseEvents, polygon: any, listener: Listener): void {
		const eventListener = (evt: MouseEvent) => {
			if (evt.target !== this.#display.canvas) {
				return;
			}

			const isCollide = polygon.collidePoint({
				x: evt.pageX - this.#display.canvas.offsetLeft,
				y: evt.pageY - this.#display.canvas.offsetTop,
			});

			if (isCollide) {
				listener();
			}
		};

		this.on(type, eventListener as Listener);
	}

	onKeyboardEvent(type: KeyboardEvents, key: string, listener: Listener): void {
		const eventListener = (evt: KeyboardEvent) => {
			if (evt.key !== key) {
				return;
			}

			listener();
		};

		this.on(type, eventListener);
	}
}

export const domEvents = new DOMEvents();
