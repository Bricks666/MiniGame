/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Display } from '../display';
import { AABB, AABBOptions } from '../math';
import { Block } from './block';
import { Group } from './group';

export interface GameObjectOptions extends AABBOptions {
	readonly block?: Block | null;
}

export interface GameObjectLifeCycle {
	start(): void;
	draw(display: Display): void;
	update(): void;
	destroy(): void;
}

export class GameObject extends AABB implements GameObjectLifeCycle {
	readonly #groups: Set<Group<this>>;

	block: Block | null;

	constructor(options: GameObjectOptions) {
		const { block, ...rest } = options;
		super(rest);
		this.#groups = new Set();
		this.block = block ?? null;
	}

	add(group: Group<this>): this {
		this.#groups.add(group);
		return this;
	}

	remove(group: Group<this>): void {
		this.#groups.delete(group);
	}

	start(): void {
		return undefined;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	draw(display: Display): void {
		return undefined;
	}

	update(): void {
		return undefined;
	}

	destroy(): void {
		this.#groups.forEach((group) => group.remove(this));

		// @ts-ignore
		this.body = undefined;

		// @ts-ignore
		this.block = undefined;
	}
}
