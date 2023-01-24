/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GameObject } from '../game-objects';
import { Script } from './script';

export interface WithScriptOptions<S extends typeof Script> {
	readonly script: S;
}

export const withScript = <S extends typeof Script>(
	options: WithScriptOptions<S>
) => {
	const { script: Scr, } = options;
	return <T extends typeof GameObject>(Constructor: T): T => {
		// @ts-ignore
		return class extends Constructor {
			script: Script<InstanceType<T>>;

			constructor(...args: any[]) {
				// @ts-ignore
				super(...args);
				this.script = new Scr(this as InstanceType<T>);
			}

			start(): void {
				super.start();
				this.script.start();
			}

			update() {
				super.update();
				this.script.update();
			}

			destroy(): void {
				super.destroy();
				this.script.destroy();
			}
		};
	};
};
