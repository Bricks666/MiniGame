import { RenderVariant } from '@/shared/packages/renderer';

export interface TextProperties {
	text: string;
	fontSize: number;
	fontFamily: string;
	strokeWidth: number;
	color: string;
	lineHeight: number;
	align?: globalThis.CanvasTextAlign;
	baseline?: globalThis.CanvasTextBaseline;
	variant: RenderVariant;
}

export type TextStyleProperties = Omit<TextProperties, 'text'>;
