/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body } from './body';
import { GameObject } from '~/game-objects';

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

	return <T extends typeof GameObject>(Constructor: T): T => {
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
				this.scene.world.addGameObject(this);
				super.start();
			}

			destroy(): void {
				this.scene.world.removeGameObject(this);
				super.destroy();
			}
		};
	};
};
