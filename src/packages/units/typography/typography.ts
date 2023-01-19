import { Text, TextOptions } from '@/packages/primitives';
import { Unit } from '../unit';

export type TypographyOptions = TextOptions;

//@ts-ignore
export class Typography extends Unit<typeof Text> {
	constructor(options: TextOptions) {
		super({
			shapeOptions: [{ ...options }],
			shape: Text,
		});
	}

	update(): void {}
}
