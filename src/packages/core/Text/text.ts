import { Screen } from '../Screen';
import { Sprite, SpriteOptions } from '../sprite';
import { TextProperties } from './index';

export interface TextOptions
	extends Omit<SpriteOptions, 'imageSrc'>,
		TextProperties {}

export class Text extends Sprite {
	text: string;
	baseOptions: Partial<TextProperties>;

	constructor(options: TextOptions) {
		const { text, height, width, x, y, ...baseOptions } = options;
		super({ height, width, x, y, imageSrc: '' });
		this.text = text;
		this.baseOptions = baseOptions;
	}

	draw(screen: Screen, ...args: Partial<TextProperties>[]): void {
		const options = args[0] || {};
		screen.print(this.rect, {
			...this.baseOptions,
			...options,
			text: options.text || this.text,
		});
	}
}
