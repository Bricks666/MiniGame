import { Text, TextOptions } from '../text';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { domEventEmitter, Handler } from '~/events';

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
		const { onClick, onHover, onLeave, ...textOptions } = options;
		super(textOptions);
		this.#onClick = onClick?.bind(this);
		this.#onHover = onHover?.bind(this);
		this.#onLeave = onLeave?.bind(this);
	}

	onMount(): void {
		if (this.#onClick) {
			domEventEmitter.onMouseEvent('click', this, this.#onClick);
		}
		if (this.#onHover) {
			domEventEmitter.onMouseEvent('mousemove', this, this.#onHover);
		}
		if (this.#onLeave) {
			domEventEmitter.onMouseEvent('mouseleave', this, this.#onLeave);
		}
	}
}
