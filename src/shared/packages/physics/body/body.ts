import { GameObject } from '~/game-objects';
import { AABB, AABBOptions, Vector, VectorLike } from '~/math';
import { Timer } from '~/time';

export interface BodyOptions extends AABBOptions {
	readonly velocity?: VectorLike;
	readonly gameObject: GameObject;
}

export class Body extends AABB {
	velocity: Vector;

	gameObject: GameObject;

	readonly isBody: true;

	constructor(options: BodyOptions) {
		const { velocity, gameObject, ...rest } = options;
		const { x, y, width, height, } = gameObject;

		super({
			x,
			y,
			width,
			height,
			...rest,
		});
		this.gameObject = gameObject;
		this.velocity = new Vector(velocity?.x, velocity?.y);
		this.isBody = true;
	}

	update(): void {
		const vx = this.velocity.x * Timer.deltaS;
		const vy = this.velocity.y * Timer.deltaS;

		this.moveOn({ x: vx, y: vy, });
	}

	destroy(): void {
		return undefined;
	}
}
