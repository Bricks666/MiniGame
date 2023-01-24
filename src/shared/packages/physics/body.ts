import { Vector, VectorLike } from '../math';

export interface BodyOptions {
	readonly position?: VectorLike;
	readonly velocity?: VectorLike;
	readonly width: number;
	readonly height: number;
}

export class Body {
	min: Vector;

	max: Vector;

	velocity: Vector;

	readonly isBody: true;

	constructor(options: BodyOptions) {
		const { height, velocity, width, position, } = options;
		this.velocity = new Vector(velocity?.x, velocity?.y);
		this.min = new Vector(position?.x, position?.y);
		this.max = new Vector(this.min.x + width, this.min.y + height);
		this.isBody = true;
	}

	update(): void {
		const vx = this.velocity.x;
		const vy = this.velocity.y;

		this.min.add(vx, vy);
		this.max.add(vx, vy);
	}

	onCollision(): void {
		return undefined;
	}

	destroy(): void {
		return undefined;
	}
}
