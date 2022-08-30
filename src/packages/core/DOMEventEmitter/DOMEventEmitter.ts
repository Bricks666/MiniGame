/* eslint-disable class-methods-use-this */
import { Listener, EventEmitter } from '../eventEmitter';
import { Rect } from '../rect';
import { Screen } from '../Screen/index';
import { Events, MouseEvents } from './types';

export class DOMEventEmitter extends EventEmitter {
	#display!: Screen;

	on(type: Events, listener: Listener): VoidFunction {
		document.addEventListener(type, listener);

		return () => {
			document.removeEventListener(type, listener);
		};
	}

	setDisplay(display: Screen): void {
		this.#display = display;
	}

	onMouseEvent(type: MouseEvents, rect: Rect, listener: Listener): void {
		const eventListener = (evt: MouseEvent) => {
			if (evt.target !== this.#display.canvas) {
				return;
			}

			if (
				rect.collidePoint({
					x: evt.x - this.#display.canvas.offsetLeft,
					y: evt.y - this.#display.canvas.offsetTop,
				})
			) {
				listener();
			}
		};

		this.on(type, eventListener as Listener);
	}
}

export const domEventEmitter = new DOMEventEmitter();
