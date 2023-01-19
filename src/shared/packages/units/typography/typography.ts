/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Text, TextOptions } from '@/shared/packages/primitives';
import { Unit } from '../unit';

export type TypographyOptions = TextOptions;

// @ts-ignore
export class Typography extends Unit<typeof Text> {
	constructor(options: TextOptions) {
		super({
			shapeOptions: [{ ...options, }],
			shape: Text,
		});
	}

	update(): void {
		return undefined;
	}
}
