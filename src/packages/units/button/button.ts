import { domEventEmitter, Handler } from '../../events';
import { Typography, TypographyOptions } from '../typography';

export interface ButtonOptions extends TypographyOptions {
	readonly onClick?: Handler;
	readonly onHover?: Handler;
	readonly onLeave?: Handler;
}

export class Button extends Typography {
	readonly #onClick?: Handler;
	readonly #onHover?: Handler;
	readonly #onLeave?: Handler;

	constructor(options: ButtonOptions) {
		const { onClick, onHover, onLeave, ...textOptions } = options;
		super(textOptions);
		this.#onClick = onClick;
		this.#onHover = onHover;
		this.#onLeave = onLeave;
		this.#subscribe();
	}

	#subscribe(): void {
		if (this.#onClick) {
			domEventEmitter.onMouseEvent('click', this.shape, this.#onClick);
		}

		if (this.#onHover) {
			domEventEmitter.onMouseEvent('mouseover', this.shape, this.#onHover);
		}

		if (this.#onLeave) {
			domEventEmitter.onMouseEvent('mouseleave', this.shape, this.#onLeave);
		}
	}
}
