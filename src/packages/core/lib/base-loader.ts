import { ExtractReturnConstructorType } from '../types';

export interface Source extends HTMLElement {
	src: string;
}

export interface SourceConstructor {
	new (...args: any[]): Source;
}

export const baseLoader = <
	T extends SourceConstructor,
	R extends ExtractReturnConstructorType<T> = ExtractReturnConstructorType<T>
>(
	Source: T,
	src: string
): Promise<R> => {
	return new Promise<R>((resolve, reject) => {
		const loader = new Source();
		loader.addEventListener(
			'load',
			() => {
				resolve(loader as R);
			},
			{
				once: true,
			}
		);
		loader.addEventListener(
			'error',
			() => {
				reject();
			},
			{
				once: true,
			}
		);

		loader.src = src;
	});
};
