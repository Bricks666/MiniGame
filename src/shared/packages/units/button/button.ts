import { domEventEmitter, Handler } from '@/shared/packages/events';
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
		this.#onClick = onClick?.bind(this);
		this.#onHover = onHover?.bind(this);
		this.#onLeave = onLeave?.bind(this);
	}

	onMount(): void {
		if (this.#onClick) {
			domEventEmitter.onMouseEvent('click', this.shape, this.#onClick);
		}

		if (this.#onHover) {
			domEventEmitter.onMouseEvent('mousemove', this.shape, this.#onHover);
		}

		if (this.#onLeave) {
			domEventEmitter.onMouseEvent('mouseleave', this.shape, this.#onLeave);
		}
	}
}
