/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AABB, AABBOptions, VectorLike } from '../math';
import { Body, BodyOptions } from '../physics';
import { Group } from '../units';

export interface GameObjectOptions extends AABBOptions {
	readonly bodyOptions: Pick<BodyOptions, 'velocity'>;
}
export class GameObject extends AABB {
	// @ts-ignore
	readonly #groups: Set<Group<this>>;

	body: Body;

	constructor(options: GameObjectOptions) {
		const { bodyOptions, ...rest } = options;
		super(rest);
		this.#groups = new Set();
		this.body = new Body({ ...bodyOptions, gameObject: this });
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

		// @ts-ignore
		this.body = undefined;
	}
}
