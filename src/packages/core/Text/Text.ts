import { RequiredTextStyleProperties, TextStyleProperties } from './types';
import { Screen } from '../Screen';
import { TextProperties } from './index';
import { Unit, UnitOptions } from '../unit';

export interface TextOptions extends UnitOptions, Partial<TextProperties> {
	readonly text: string;
}

export class Text extends Unit {
	text: string;
	options: RequiredTextStyleProperties;

	static defaultStyle: RequiredTextStyleProperties = {
		fillStyle: '#000000',
		fontFamily: "'Public Pixel', monospace",
		fontSize: 20,
		strokeWidth: 20,
		lineHeight: 1.2,
	};

	constructor(options: TextOptions) {
		const { text, rect, ...baseOptions } = options;
		super({
			rect,
		});
		this.text = text;
		this.options = { ...Text.defaultStyle, ...baseOptions };
		this.rect.width = this.text.length * this.options.fontSize;
		this.rect.height = this.options.fontSize * this.options.lineHeight;
	}

	draw(screen: Screen, ...args: Partial<TextProperties>[]): void {
		const options = args[0] || {};
		screen.print(this.rect, {
			...this.options,
			...options,
			text: options.text || this.text,
		});
	}

	update(): void {}
}

export const setDefaultStyle = (defaultStyle: TextStyleProperties): void => {
	Object.assign(Text.defaultStyle, defaultStyle);
};
