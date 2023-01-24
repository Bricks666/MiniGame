import { Vector, VectorLike } from './vector';

export interface AABBOptions {
	readonly x?: number;
	readonly y?: number;
	readonly width?: number;
	readonly height?: number;
}

export class AABB {
	#min: Vector;

	#max: Vector;

	constructor(options: AABBOptions) {
		const { height = 0, width = 0, x = 0, y = 0, } = options;
		this.#min = new Vector(x, y);

		this.#max = new Vector(this.#min.x + width, this.#min.y + height);
	}

	get height(): number {
		return Math.abs(this.#max.y - this.#min.y);
	}

	set height(height: number) {
		this.#max.y = this.#min.y + height;
	}

	get width(): number {
		return Math.abs(this.#max.x - this.#min.x);
	}

	set width(width: number) {
		this.#max.x = this.#min.x + width;
	}

	get x(): number {
		return this.#min.x;
	}

	set x(x: number) {
		this.#min.x = x;
		this.#max.x = x;
	}

	get centerX(): number {
		return (this.#max.x + this.#min.x) / 2;
	}

	set centerX(centerX: number) {
		const { width, } = this;
		this.#min.x = centerX - width / 2;
		this.#max.x = centerX + width / 2;
	}

	get endX(): number {
		return this.#max.x;
	}

	get y(): number {
		return this.#min.y;
	}

	set y(y: number) {
		this.#max.y = y;
		this.#min.y = y;
	}

	get centerY(): number {
		return (this.#max.y + this.#min.y) / 2;
	}

	set centerY(centerY: number) {
		const { height, } = this;
		this.#min.y = centerY - height / 2;
		this.#max.y = centerY + height / 2;
	}

	get endY(): number {
		return this.#max.y;
	}

	moveOn(vector: VectorLike): this {
		this.#min.add(vector.x, vector.y);
		this.#max.add(vector.x, vector.y);

		return this;
	}

	moveTo(vector: VectorLike): this {
		const { height, width, } = this;
		this.#min.copy(vector);
		this.#max.copy({
			x: vector.x + width,
			y: vector.y + height,
		});

		return this;
	}
}
