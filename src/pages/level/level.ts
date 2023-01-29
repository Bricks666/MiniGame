import { PADDING } from '@/shared/configs';
import { Aside, GameField } from './ui';
import { Scene, SceneOptions } from '~/scene';

export interface LevelOptions extends SceneOptions {}

export class Level extends Scene {
	constructor(options: LevelOptions) {
		super({
			...options,
			shapeOptions: {
				padding: PADDING,
				color: 'black',
				...options.shapeOptions,
			},
		});
	}

	init(): void {
		new GameField({
			x: this.shape.innerLeft,
			y: this.shape.innerTop,
			width: this.shape.innerWidth * 0.6,
			height: this.shape.innerHeight,
		}).addOnScene(this);

		new Aside({
			width: this.shape.innerWidth * 0.4 - 50,
			x: this.shape.innerWidth * 0.6 + 50,
			y: this.shape.innerTop,
			height: this.shape.innerHeight,
		}).addOnScene(this);

		super.init();
	}
}
