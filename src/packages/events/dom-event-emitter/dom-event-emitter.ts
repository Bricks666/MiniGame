import { Display } from '@/packages/display';
import { Polygon } from '@/packages/primitives';
import { Listener, EventEmitter } from '../event-emitter';
import { Events, MouseEvents } from './types';

export class DOMEventEmitter extends EventEmitter {
	#display!: Display;

	on(type: Events, listener: Listener): VoidFunction {
		document.addEventListener(type, listener);

		return () => {
			document.removeEventListener(type, listener);
		};
	}

	setDisplay(display: Display): void {
		this.#display = display;
	}

	onMouseEvent(type: MouseEvents, polygon: Polygon, listener: Listener): void {
		const eventListener = (evt: MouseEvent) => {
			if (evt.target !== this.#display.canvas) {
				return;
			}

			console.log(evt.x, this.#display.canvas.offsetLeft);
			console.log(evt.y, this.#display.canvas.offsetTop);

			if (
				polygon.collidePoint({
					x: evt.x - this.#display.canvas.offsetLeft,
					y: evt.y - this.#display.canvas.offsetTop,
				})
			) {
				console.log(evt, polygon);
				console.log('Collide');
				listener();
			}
		};

		this.on(type, eventListener as Listener);
	}
}

export const domEventEmitter = new DOMEventEmitter();
