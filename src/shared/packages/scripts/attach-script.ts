/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GameObject } from '../game-objects';
import { Script } from './script';

type ExtractAttachScriptScriptOption<S extends typeof Script> = Omit<
	ConstructorParameters<S>['0'],
	'gameObject'
>;

export type AttachScriptOptions<S extends typeof Script> = {
	readonly Script: S;
} & ExtractAttachScriptScriptOption<S>;

export const AttachScript = <S extends typeof Script>(
	options: AttachScriptOptions<S>
) => {
	const { Script: Scr, ...rest } = options;
	return <O extends typeof GameObject>(Constructor: O): O => {
		// @ts-ignore
		return class extends Constructor {
			constructor(...args: any[]) {
				// @ts-ignore
				super(...args);
				this.scripts.add(
					new Scr({
						...rest,
						gameObject: this as InstanceType<O>,
					}) as Script<O>
				);
			}
		};
	};
};
