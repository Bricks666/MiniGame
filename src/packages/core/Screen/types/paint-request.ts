import { RectProperties } from '@/packages/core/rect';
import { TextProperties } from '@/packages/core/Text';

export type RequestType = 'text' | 'sprite' | 'color';

export type PaintMethods = Extract<
	keyof CanvasRenderingContext2D,
	'fillText' | 'drawImage' | 'fillRect'
>;

export interface BasePaintRequest<T extends RequestType, D> {
	readonly type: T;
	readonly rect: RectProperties;
	readonly value: D;
}

export type PaintRequests =
	| BasePaintRequest<'text', TextProperties>
	| BasePaintRequest<'sprite', CanvasImageSource>
	| BasePaintRequest<'color', string>;
