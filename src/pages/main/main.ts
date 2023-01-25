/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header, Menu } from './ui';
import { Scene, SceneOptions } from '~/scene';

export type MainOptions = SceneOptions;

export class Main extends Scene {
	constructor(options: MainOptions) {
		super({
			...options,
			shapeOptions: { color: 'black', ...options.shapeOptions, },
		});
	}

	init(): void {
		const { x, y, width, height, } = this.shape;

		new Header({
			height: 50,
			x,
			y,
			width,
		}).addToScene(this);
		new Menu({
			width,
			height: height - 50,
			y: 50,
			x: 0,
		}).addToScene(this);

		super.init();
	}
}
