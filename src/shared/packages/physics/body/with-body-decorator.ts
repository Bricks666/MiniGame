/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body } from './body';
import { GameObject } from '~/game-objects';
import { VectorLike } from '~/math';

export const withBody = () => {
	return <T extends typeof GameObject>(Constructor: T): T => {
		// @ts-ignore
		return class extends Constructor {
			body: Body;

			constructor(...args: any[]) {
				// @ts-ignore
				super(...args);
				this.body = new Body({
					gameObject: this,
				});
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
				super.destroy();
				this.body.destroy();
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
