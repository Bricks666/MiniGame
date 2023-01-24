import { TextProperties, TextStyleProperties } from './types';
import { Display } from '~/display';
import { GameObject, GameObjectOptions } from '~/game-objects';
import { textRequestAdapter } from '~/renderer';

export interface TextOptions
	extends Partial<GameObjectOptions>,
		Partial<TextProperties> {
	readonly text: string;
}

export class Text extends GameObject {
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

	constructor(options: TextOptions) {
		const { text, height, width, x, y, block, ...styles } = options;
		super({
			height,
			width,
			x,
			y,
			block,
		});
		this.text = text;
		this.styles = { ...Text.defaultStyle, ...styles, };
		this.width = this.text.length * this.styles.fontSize;
		this.height = this.styles.fontSize;
	}

	draw(display: Display): void {
		display.draw(textRequestAdapter(this));
	}

	update(): void {
		return undefined;
	}
}
