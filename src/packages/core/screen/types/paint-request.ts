import { RectProperties } from '../../rect';

export type PaintMethods = Extract<
	keyof CanvasRenderingContext2D,
	'fillText' | 'drawImage' | 'fillRect'
>;

export type PaintType = 'text' | 'sprite' | 'color';
interface PaintMethodParam {
	readonly text: Parameters<CanvasRenderingContext2D['fillText']>;
	readonly sprite: Parameters<CanvasRenderingContext2D['drawImage']>;
	readonly color: Parameters<CanvasRenderingContext2D['fillRect']>;
}

export interface PaintRequest<T extends PaintType> {
	readonly prepareContext?: (context: CanvasRenderingContext2D) => void;
	readonly args: PaintMethodParam[T];
	readonly type: T;
	readonly rect: RectProperties;
}
