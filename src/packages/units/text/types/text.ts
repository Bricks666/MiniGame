export interface TextProperties {
	readonly text: string;
	readonly fontSize: number;
	readonly fontFamily: string;
	readonly strokeWidth: number;
	readonly fillStyle: string;
  readonly lineHeight: number;
}

export type TextStyleProperties = Omit<TextProperties, 'text'>;

export type RequiredTextStyleProperties = Required<TextStyleProperties>;
