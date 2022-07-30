export interface TextProperties {
	readonly text: string;
	readonly fontSize?: string;
	readonly fontFamily?: string;
	readonly strokeWidth?: string;
	readonly fillStyle?: string;
}

export type TextStyleProperties = Omit<TextProperties, 'text'>;

export type RequiredTextStyleProperties = Required<TextStyleProperties>;
