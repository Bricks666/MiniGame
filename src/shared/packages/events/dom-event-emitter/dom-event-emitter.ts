import { Display } from '@/shared/packages/display';
import { Polygon } from '@/shared/packages/primitives';
import { Listener, EventEmitter } from '../event-emitter';
import { Events, KeyboardEvents, MouseEvents } from './types';

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

			if (type === 'click') {
				console.log(
					'evt',
					evt.x - this.#display.canvas.offsetLeft,
					evt.y - this.#display.canvas.offsetTop,
					polygon,
					isCollide
				);
			}

			if (isCollide) {
				listener();
			}
		};

		this.on(type, eventListener as Listener);
	}

	onKeyboardEvent(type: KeyboardEvents, key: string, listener: Listener): void {
		const eventListener = (evt: KeyboardEvent) => {
			if (evt.key !== key) {
				console.log(evt, key);
				return;
			}

			listener();
		};

		this.on(type, eventListener);
	}
}

export const domEventEmitter = new DOMEventEmitter();
