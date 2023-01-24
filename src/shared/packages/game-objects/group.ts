import { GameObject, GameObjectLifeCycle } from './game-object';
import { Display } from '~/display';
import { Drawable } from '~/primitives';

export interface GroupOptions<T extends GameObject> {
	readonly units?: T[];
}

export class Group<T extends GameObject = GameObject>
implements Drawable, GameObjectLifeCycle
{
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
		this.#units.forEach((unit) => unit.start());
	}

	update(): this {
		this.#units.forEach((unit) => unit.update());
		return this;
	}

	draw(display: Display): this {
		this.#units.forEach((unit) => unit.draw(display));
		return this;
	}

	destroy() {
		this.#units.forEach((unit) => unit.destroy());
	}

	add(unit: T): this {
		this.#units.add(unit);
		unit.add(this);
		unit.start();
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
