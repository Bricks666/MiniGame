import { Bullet } from './bullet';
import { Vector, VectorLike } from '~/math';
import { WithBody } from '~/physics';
import { Script, ScriptOptions } from '~/scripts';

export interface BulletScriptOptions extends ScriptOptions<WithBody<Bullet>> {
	readonly velocity: VectorLike;
}

export class BulletScript extends Script<WithBody<Bullet>> {
	#velocity: Vector;

	constructor(options: BulletScriptOptions) {
		const { velocity, gameObject, } = options;

		super({ gameObject, });

		this.#velocity = new Vector(velocity);
	}

	start(): void {
		this.gameObject.body.velocity.set(this.#velocity);
	}

	update(): void {
		const { innerTop, innerBottom, } = this.gameObject.block;
		if (innerTop >= this.gameObject.y || innerBottom <= this.gameObject.endY) {
			this.gameObject.destroy();
		}
	}
}
