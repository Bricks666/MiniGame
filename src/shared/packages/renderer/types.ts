export type RenderType = 'text' | 'rectangle' | 'circle' | 'image';

export interface BaseRenderRequest<T extends RenderType> {
	readonly type: T;
	readonly x: number;
	readonly y: number;
}

export type RenderVariant = 'stroke' | 'fill' | 'both';

export type RenderPrimitive = {
	readonly color: string;
} & (
	| {
			readonly variant: Extract<RenderVariant, 'fill'>;
			readonly strokeWidth?: never;
			readonly strokeColor?: never;
	  }
	| {
			readonly variant: Exclude<RenderVariant, 'fill'>;
			readonly strokeWidth: number;
			readonly strokeColor: string;
	  }
);

export type TextRenderRequest = BaseRenderRequest<'text'> &
	RenderPrimitive & {
		readonly text: string;
		readonly maxWidth: number;
		readonly font?: string;
		readonly align?: globalThis.CanvasTextAlign;
		readonly baseline?: globalThis.CanvasTextBaseline;
	};

export type RectangleRenderRequest = BaseRenderRequest<'rectangle'> &
	RenderPrimitive & {
		readonly width: number;
		readonly height: number;
	};

export type CircleRenderRequest = BaseRenderRequest<'circle'> &
	RenderPrimitive & {
		readonly radius: number;
	};

export interface ImageRenderRequest extends BaseRenderRequest<'image'> {
	readonly image: globalThis.CanvasImageSource;
	readonly width: number;
	readonly height: number;
}

export type RenderRequest =
	| TextRenderRequest
	| RectangleRenderRequest
	| CircleRenderRequest
	| ImageRenderRequest;
