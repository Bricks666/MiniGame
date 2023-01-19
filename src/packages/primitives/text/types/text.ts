import { RenderVariant } from '../../../renderer';

export interface TextProperties {
	readonly text: string;
	readonly fontSize: number;
	readonly fontFamily: string;
	readonly strokeWidth: number;
	readonly color: string;
	readonly lineHeight: number;
	readonly align?: CanvasTextAlign;
	readonly baseline?: CanvasTextBaseline;
	readonly variant: RenderVariant;
}

export type TextStyleProperties = Omit<TextProperties, 'text'>;
