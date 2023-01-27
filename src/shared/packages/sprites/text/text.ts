import { TextProperties, TextStyleProperties } from './types';
import { Display } from '~/display';
import { AABB, AABBOptions } from '~/math';
import { textRequestAdapter } from '~/renderer';

export interface TextOptions extends AABBOptions, Partial<TextProperties> {
	readonly text: string;
}

export class Text extends AABB {
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
		const { text, height, width, x, y, ...styles } = options;
		super({
			height,
			width,
			x,
			y,
		});
		this.text = text;
		this.styles = { ...Text.defaultStyle, ...styles, };
		this.width = this.text.length * this.styles.fontSize;
		this.height = this.styles.fontSize;
	}

	render(display: Display): void {
		display.draw(textRequestAdapter(this));
	}
}
