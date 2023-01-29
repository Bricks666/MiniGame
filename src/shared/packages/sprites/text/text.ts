import { Sprite, SpriteOptions } from '../sprite';
import { TextProperties, TextStyleProperties } from './types';
import { Display } from '~/display';
import { GameObject } from '~/game-objects';
import { textRequestAdapter } from '~/renderer';

export interface TextOptions<O extends GameObject>
	extends SpriteOptions<O>,
		Partial<TextProperties> {
	readonly text: string;
}

export class Text<O extends GameObject> extends Sprite<O> {
	text: string;

	styles: TextStyleProperties;

	static defaultStyle: TextStyleProperties = {
		fontFamily: "'Public Pixel', monospace",
		fontSize: 18,
		strokeWidth: 20,
		lineHeight: 1.2,
		color: 'black',
		variant: 'fill',
	};

	constructor(options: TextOptions<O>) {
		const { text, height, width, x, y, gameObject, ...styles } = options;
		super({
			height,
			width,
			x,
			y,
			gameObject,
		});
		this.text = text;
		this.styles = { ...Text.defaultStyle, ...styles, };
		this.width = this.text.length * this.styles.fontSize;
		this.height = this.styles.fontSize;
		this.gameObject.height = this.styles.fontSize;
	}

	render(display: Display): void {
		display.draw(textRequestAdapter(this));
	}
}
