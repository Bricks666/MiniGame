/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body } from './body';
import { Unit } from '~/game-objects';
import { VectorLike } from '~/math';

type ExtractAttachPhysicsBodyOptions<B extends typeof Body> = Omit<
	ConstructorParameters<B>['0'],
	'gameObject'
>;

export type AttachPhysicsOptions<B extends typeof Body> = {
	readonly Body?: B;
} & ExtractAttachPhysicsBodyOptions<B>;

export const AttachPhysics = <B extends typeof Body = typeof Body>(
	options?: AttachPhysicsOptions<B>
) => {
	const { Body: Bd = Body, ...rest } = options || {};

	return <T extends typeof Unit>(Constructor: T): T => {
		// @ts-ignore
		return class extends Constructor {
			body: Body;

			constructor(...args: any[]) {
				// @ts-ignore
				super(...args);
				this.body = new Bd({
					...rest,
					gameObject: this,
				});
			}

			start(): void {
				this.scene.world.addUnit(this);
				super.start();
			}

			update() {
				this.body.update();
				this.moveTo({
					x: this.body.x,
					y: this.body.y,
				});
				super.update();
			}

			destroy(): void {
				this.block.scene.world.removeUnit(this);
				this.body.destroy();
				super.destroy();
			}

			moveOn(vector: VectorLike): this {
				this.body.moveOn(vector);
				super.moveOn(vector);

				return this;
			}

			moveTo(vector: VectorLike): this {
				this.body.moveTo(vector);
				super.moveTo(vector);

				return this;
			}
		};
	};
};
