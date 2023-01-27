export interface GroupOptions<T extends Groupable> {
	readonly units?: T[];
}

export interface Groupable {
	add(group: Group): unknown;
	remove(group: Group): unknown;
}

export class Group<T extends Groupable = Groupable> {
	readonly #items: Set<T>;

	constructor(options: GroupOptions<T> = {}) {
		const { units, } = options;
		this.#items = new Set<T>();

		if (units) {
			units.forEach((unit) => this.add(unit));
		}
	}

	get length(): number {
		return this.#items.size;
	}

	get items(): Set<T> {
		return this.#items;
	}

	add(item: T): this {
		this.#items.add(item);
		item.add(this);
		return this;
	}

	forEach(callback: (item: T) => void): this {
		this.#items.forEach(callback);
		return this;
	}

	remove(item: T): this {
		this.#items.delete(item);
		item.remove(this);
		return this;
	}

	has(item: T): boolean {
		return this.#items.has(item);
	}

	clear(): this {
		this.#items.forEach(this.remove.bind(this));
		return this;
	}

	find(callback: (unit: T) => boolean): T | null {
		return Array.from(this.#items).find(callback) ?? null;
	}
}
