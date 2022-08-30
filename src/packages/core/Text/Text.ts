import { RequiredTextStyleProperties, TextStyleProperties } from './types';
import { Screen } from '../Screen';
import { Sprite, SpriteOptions } from '../sprite';
import { TextProperties } from './index';

export interface TextOptions
	extends Omit<SpriteOptions, 'imageSrc'>,
		Partial<TextProperties> {
	readonly text: string;
}

export class Text extends Sprite {
	text: string;
	options: RequiredTextStyleProperties;

	static defaultStyle: RequiredTextStyleProperties = {
		fillStyle: '#000000',
		fontFamily: '\'Public Pixel\', monospace',
		fontSize: 20,
		strokeWidth: 20,
		lineHeight: 1.2,
	};

	constructor(options: TextOptions) {
		const {
			text, height, width, x, y, ...baseOptions
		} = options;
		super({
			height, width, x, y, imageSrc: '',
		});
		this.text = text;
		this.options = { ...Text.defaultStyle, ...baseOptions, };
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
}

export const setDefaultStyle = (defaultStyle: TextStyleProperties): void => {
	Object.assign(Text.defaultStyle, defaultStyle);
};
