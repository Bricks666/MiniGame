export interface Coordinate {
	readonly x: number;
	readonly y: number;
}

export interface Size {
	readonly width: number;
	readonly height: number;
}

export type AnyConstructor = abstract new (...args: any[]) => any;

export type ExtractReturnConstructorType<T extends AnyConstructor> =
	T extends abstract new (...args: any[]) => infer R ? R : never;
