/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Vector, VectorLike } from '../math';
import { Body, BodyOptions } from '../physics';
import { Group } from '../units';

export interface GameObjectOptions {
	readonly position: VectorLike;
	readonly width: number;
	readonly height: number;
	readonly bodyOptions: Pick<BodyOptions, 'velocity'>;
}
export class GameObject {
	#position: Vector;

	#width: number;

	#height: number;

	#center!: Vector;

	// @ts-ignore
	readonly #groups: Set<Group<this>>;

	body: Body;

	constructor(options: GameObjectOptions) {
		const { height, position, width, bodyOptions, } = options;

		this.#position = new Vector(position);
		this.#height = height;
		this.#width = width;
		this.#groups = new Set();
		this.body = new Body({ ...bodyOptions, width, height, position, });

		this.#calculateCenter();
	}

	get x(): number {
		return this.#position.x;
	}

	set x(x: number) {
		this.#position.x = x;
		this.#calculateCenter();
	}

	get y(): number {
		return this.#position.y;
	}

	set y(y: number) {
		this.#position.y = y;
		this.#calculateCenter();
	}

	get width(): number {
		return this.#width;
	}

	get height(): number {
		return this.#height;
	}

	// @ts-ignore

	add(group: Group<this>): this {
		this.#groups.add(group);
		return this;
	}

	// @ts-ignore

	remove(group: Group<this>): void {
		this.#groups.delete(group);
	}

	kill(): void {
		this.#groups.forEach((group) => group.remove(this));
	}

	update(): void {
		this.body.update();
		this.#position.copy(this.body.min);

		return undefined;
	}

	destroy(): void {
		this.body.destroy();

		// @ts-ignore
		this.body = undefined;
	}

	#calculateCenter() {
		this.#center = new Vector(
			this.#position.x + this.#width * 0.5,
			this.#position.y + this.#height * 0.5
		);
	}
}
