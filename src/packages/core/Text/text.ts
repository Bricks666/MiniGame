import { Screen } from '../Screen';
import { Sprite, SpriteOptions } from '../sprite';
import { TextProperties } from './index';

export interface TextOptions extends SpriteOptions, TextProperties {}

export class Text extends Sprite {
	text: string;

	constructor(options: TextOptions) {
		const { text, ...spriteOptions } = options;
		super(spriteOptions);
		this.text = text;
	}

	draw(screen: Screen, ...args: Partial<TextProperties>[]): void {
		const options = args[0] || {};
		screen.print(this.rect, { ...options, text: options.text || this.text, });
	}
}
