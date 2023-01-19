import { Text, TextOptions } from '../primitives';
import { Unit } from './unit';

export type TypographyOptions = TextOptions;

//@ts-ignore
export class Typography extends Unit<typeof Text> {
	constructor(options: TextOptions) {
		super({
			shapeOptions: [{ ...options }],
			shape: Text,
		});
		this.shape.y = 0;

		console.log(this.shape);
	}

	update(): void {}
}
