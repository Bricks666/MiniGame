import { RequiredTextStyleProperties } from '../types';

export const setTextStyle = (
	ctx: CanvasRenderingContext2D,
	style: RequiredTextStyleProperties
): void => {
	ctx.fillStyle = style.fillStyle;
	ctx.font = `${style.fontSize}px ${style.fontFamily}`;
	ctx.strokeStyle = `${style.strokeWidth}px`;
};
