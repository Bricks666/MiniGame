import { RenderVariant } from '@/packages/renderer';

export interface TextProperties {
	readonly text: string;
	readonly fontSize: number;
	readonly fontFamily: string;
	readonly strokeWidth: number;
	readonly color: string;
	readonly lineHeight: number;
	readonly align?: globalThis.CanvasTextAlign;
	readonly baseline?: globalThis.CanvasTextBaseline;
	readonly variant: RenderVariant;
}

export type TextStyleProperties = Omit<TextProperties, 'text'>;
