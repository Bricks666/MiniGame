import { domEventEmitter, Handler } from '../DOMEventEmitter';
import { Text, TextOptions } from '../Text';

export interface ButtonOptions extends TextOptions {
	readonly onClick?: Handler;
	readonly onHover?: Handler;
	readonly onLeave?: Handler;
}

export class Button extends Text {
	readonly #onClick?: Handler;
	readonly #onHover?: Handler;
	readonly #onLeave?: Handler;

	constructor(options: ButtonOptions) {
		const {
			onClick, onHover, onLeave, ...textOptions
		} = options;
		super(textOptions);
		this.#onClick = onClick;
		this.#onHover = onHover;
		this.#onLeave = onLeave;
		this.#subscribe();
	}

	#subscribe(): void {
		if (this.#onClick) {
			domEventEmitter.onMouseEvent('click', this.rect, this.#onClick);
		}

		if (this.#onHover) {
			domEventEmitter.onMouseEvent('hover', this.rect, this.#onHover);
		}

		if (this.#onLeave) {
			domEventEmitter.onMouseEvent('leave', this.rect, this.#onLeave);
		}
	}
}
