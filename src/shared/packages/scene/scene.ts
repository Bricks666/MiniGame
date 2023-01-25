import { Engine } from '~/core';
import { Display } from '~/display';
import {
	Block,
	GameObjectLifeCycle,
	Group,
	Rectangle,
	RectangleOptions
} from '~/game-objects';

export interface SceneOptions {
	readonly blocks?: Group<Block>;
	readonly shapeOptions?: RectangleOptions;
}

export class Scene implements GameObjectLifeCycle {
	readonly blocks: Group<Block>;

	readonly shape: Rectangle;

	readonly engine: Engine;

	isInit = false;

	constructor(options: SceneOptions) {
		const { blocks, shapeOptions, } = options;

		this.blocks = blocks ?? new Group();
		this.engine = null as unknown as Engine;
		this.shape = new Rectangle({ ...shapeOptions, });
	}

	addBlock(block: Block): this {
		this.blocks.add(block);
		return this;
	}

	removeBlock(block: Block): this {
		this.blocks.remove(block);
		return this;
	}

	init(): void {
		this.isInit = true;
		this.blocks.forEach((block) => block.init());
	}

	start(): void {
		this.shape.start();
		this.blocks.forEach((block) => block.start());
	}

	draw(display: Display): void {
		this.shape.draw(display);
		this.blocks.forEach((block) => block.draw(display));
	}

	update(): void {
		this.shape.update();
		this.blocks.forEach((block) => block.update());
	}

	destroy(): void {
		this.shape.destroy();
		this.blocks.forEach((block) => block.destroy());
	}
}
