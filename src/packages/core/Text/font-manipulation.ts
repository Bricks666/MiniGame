import { RequiredTextStyleProperties, TextStyleProperties } from './types';

const defaultStyle: RequiredTextStyleProperties = {
	fillStyle: '#000000',
	fontFamily: "'Public Pixel', monospace",
	fontSize: '20px',
	strokeWidth: '20px',
};

export const getTextDefaultStyle = (): RequiredTextStyleProperties => ({
	...defaultStyle,
});

export const setTextDefaultStyle = (style: TextStyleProperties): void => {
	Object.assign(defaultStyle, style);
};

export const setTextStyle = (
	ctx: CanvasRenderingContext2D,
	style: TextStyleProperties
): void => {
	const styles: RequiredTextStyleProperties = { ...defaultStyle, ...style };
	ctx.fillStyle = styles.fillStyle;
	ctx.font = `${styles.fontSize} ${styles.fontFamily}`;
	ctx.strokeStyle = styles.strokeWidth;
};
