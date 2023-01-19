import { Display, Unit, UnitOptions } from '../../core';
import { printRequestAdapter } from './lib';
import {
	RequiredTextStyleProperties,
	TextProperties,
	TextStyleProperties,
} from './types';

export interface TextOptions extends UnitOptions, Partial<TextProperties> {
	readonly text: string;
}

export class Text extends Unit {
	text: string;
	styles: RequiredTextStyleProperties;

	static defaultStyle: RequiredTextStyleProperties = {
		fillStyle: '#000000',
		fontFamily: "'Public Pixel', monospace",
		fontSize: 20,
		strokeWidth: 20,
		lineHeight: 1.2,
	};

	constructor(options: TextOptions) {
		const { text, rect, ...styles } = options;
		super({
			rect,
		});
		this.text = text;
		this.styles = { ...Text.defaultStyle, ...styles };
		this.rect.width = this.text.length * this.styles.fontSize;
		this.rect.height = this.styles.fontSize * this.styles.lineHeight;
	}

	draw(screen: Display, ...args: Partial<TextProperties>[]): void {
		const passedStyles = args[0] || {};
		const styles = { ...this.styles, ...passedStyles };
		screen.draw(
			printRequestAdapter({
				rect: this.rect,
				text: this.text,
				styles,
			})
		);
	}

	update(): void {}
}
