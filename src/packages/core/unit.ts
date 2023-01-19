import { Group } from './group';
import { Display } from '../display';
import { Drawable } from './types';
import { Rectangle, RectangleCoordinates } from '../primitives';

export interface UnitOptions {
	readonly rect?: RectangleCoordinates;
}

export abstract class Unit implements Drawable {
	rect: Rectangle;
	readonly #groups: Set<Group<this>>;

	constructor(options: UnitOptions) {
		const { rect } = options;
		this.rect = new Rectangle(rect);
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

	abstract draw(screen: Display, ...args: any[]): void;

	abstract update(): void;
}
