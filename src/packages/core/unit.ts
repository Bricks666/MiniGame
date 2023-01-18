import { Group } from './group';
import { Rect, RectParams } from './rect';
import { Screen } from './screen';
import { Drawable } from './types';

export interface UnitOptions {
	readonly rect?: RectParams;
}

export abstract class Unit implements Drawable {
	rect: Rect;
	readonly #groups: Set<Group<this>>;

	constructor(options: UnitOptions) {
		const { rect } = options;
		this.rect = new Rect(rect);
		this.#groups = new Set();
	}

	add(group: Group<this>): void {
		this.#groups.add(group);
	}

	remove(group: Group<this>): void {
		this.#groups.delete(group);
	}

	kill(): void {
		this.#groups.forEach((group) => group.remove(this));
	}

	abstract draw(screen: Screen, ...args: any[]): void;

	abstract update(): void;
}
