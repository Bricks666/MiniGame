import { Display } from '@/shared/packages/display';
import { GameObject } from '@/shared/packages/game-objects';
import { Drawable } from '@/shared/packages/primitives';
import { Unit } from '../unit';

export interface GroupOptions<T extends Unit | GameObject> {
	readonly units?: T[];
}

export class Group<T extends Unit | GameObject = Unit> implements Drawable {
	readonly #units: Set<T>;

	constructor(options: GroupOptions<T> = {}) {
		const { units, } = options;
		this.#units = new Set<T>();

		if (units) {
			units.forEach((unit) => this.add(unit));
		}
	}

	get length(): number {
		return this.#units.size;
	}

	start(): void {
		this.#units.forEach((unit) => unit.start?.());
	}

	update(): this {
		this.#units.forEach((unit) => unit.update());
		return this;
	}

	draw(display: Display): this {
		this.#units.forEach((unit) => unit.draw?.(display));
		return this;
	}

	add(unit: T): this {
		this.#units.add(unit);
		unit.add(this);
		unit.onMount?.();
		return this;
	}

	forEach(callback: (unit: T) => void): this {
		this.#units.forEach(callback);
		return this;
	}

	remove(unit: T): this {
		this.#units.delete(unit);
		unit.remove(this);
		return this;
	}

	has(unit: T): boolean {
		return this.#units.has(unit);
	}

	clear(): this {
		this.#units.forEach(this.remove.bind(this));
		return this;
	}

	find(callback: (unit: T) => boolean): T | null {
		return Array.from(this.#units).find(callback) ?? null;
	}
}
