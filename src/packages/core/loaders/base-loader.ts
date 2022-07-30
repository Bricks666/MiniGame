/* eslint-disable no-shadow */
import { ExtractReturnConstructorType } from '../types';
import { SourceConstructor } from './types';

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
