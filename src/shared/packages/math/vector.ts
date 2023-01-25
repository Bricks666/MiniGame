export interface VectorLike {
	readonly x: number;
	readonly y: number;
}

export class Vector {
	static ZERO: Vector = new Vector(0, 0);

	x: number;

	y: number;

	constructor(x?: number, y?: number);

	constructor(vector: VectorLike);

	constructor(x?: number | VectorLike, y?: number) {
		if (typeof x === 'object') {
			this.x = x.x;
			this.y = x.y;
			return;
		}

		this.x = x ?? 0;
		this.y = y ?? this.x;
	}

	get length(): number {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	add(x: number, y: number): this {
		this.x += x;
		this.y += y;

		return this;
	}

	set(src: VectorLike): this {
		this.x = src.x;
		this.y = src.y;

		return this;
	}

	invert(): this {
		this.x = -this.x;
		this.y = -this.y;

		return this;
	}
}
