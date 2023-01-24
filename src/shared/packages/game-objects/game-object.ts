/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Display } from '../display';
import { AABB, AABBOptions, VectorLike } from '../math';
import { Body, BodyOptions } from '../physics';
import { rectangleRequestAdapter } from '../renderer';
import { Group, UnitsBlock } from '../units';

export interface GameObjectOptions extends AABBOptions {
	readonly bodyOptions: Pick<BodyOptions, 'velocity'>;
	readonly block: UnitsBlock;
}

export class GameObject extends AABB {
	readonly #groups: Set<Group<this>>;

	block: UnitsBlock;

	body: Body;

	constructor(options: GameObjectOptions) {
		const { bodyOptions, block, ...rest } = options;
		super(rest);
		this.#groups = new Set();
		this.block = block;
		this.body = new Body({ ...bodyOptions, gameObject: this, });
	}

	add(group: Group<this>): this {
		this.#groups.add(group);
		return this;
	}

	remove(group: Group<this>): void {
		this.#groups.delete(group);
	}

	kill(): void {
		this.#groups.forEach((group) => group.remove(this));
	}

	start(): void {
		return undefined;
	}

	draw(display: Display): void {
		display.draw(rectangleRequestAdapter(this));
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
		this.#groups.forEach((group) => group.remove(this));

		// @ts-ignore
		this.body = undefined;

		// @ts-ignore
		this.block = undefined;
	}
}
