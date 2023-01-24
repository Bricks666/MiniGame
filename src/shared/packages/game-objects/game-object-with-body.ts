/* eslint-disable @typescript-eslint/ban-ts-comment */
import { VectorLike } from '../math';
import { Body, BodyOptions } from '../physics';
import {
	GameObject,
	GameObjectLifeCycle,
	GameObjectOptions
} from './game-object';

export interface GameObjectWidthBodyOptions extends GameObjectOptions {
	readonly bodyOptions: Pick<BodyOptions, 'velocity'>;
}
export class GameObjectWidthBody
	extends GameObject
	implements GameObjectLifeCycle
{
	body: Body;

	constructor(options: GameObjectWidthBodyOptions) {
		const { bodyOptions, ...rest } = options;
		super(rest);
		this.body = new Body({ ...bodyOptions, gameObject: this, });
	}

	update(): void {
		this.body.update();
		this.moveTo({
			x: this.body.x,
			y: this.body.y,
		});

		return undefined;
	}

	moveOn(vector: VectorLike): this {
		super.moveOn(vector);
		this.body.moveOn(vector);
		return this;
	}

	destroy(): void {
		this.body.destroy();
		super.destroy();
	}
}
