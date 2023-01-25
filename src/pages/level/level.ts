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
		new Aside({
			width: this.shape.innerWidth / 4,
			x: this.shape.innerWidth * 0.75,
			y: this.shape.innerTop,
			height: this.shape.innerHeight,
		}).addToScene(this);

		new GameField({
			x: this.shape.innerLeft,
			y: this.shape.innerTop,
			variant: 'both',
			strokeColor: 'white',
			strokeWidth: 6,
			width: this.shape.innerWidth * 0.75,
			height: this.shape.innerHeight,
		}).addToScene(this);

		super.init();
	}
}
