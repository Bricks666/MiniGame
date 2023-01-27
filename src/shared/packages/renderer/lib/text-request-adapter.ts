import { TextRenderRequest } from '../types';
import { Text } from '~/sprites';

export const textRequestAdapter = (text: Text<any>): TextRenderRequest => {
	return {
		type: 'text',
		color: text.styles.color,
		maxWidth: text.width,
		text: text.text,
		x: text.x,
		y: text.y + text.height,
		align: text.styles.align,
		variant: text.styles.variant || 'fill',
		strokeWidth: (text.styles.strokeWidth ?? 1) as never,
		font: `${text.styles.fontSize}px ${text.styles.fontFamily}`,
		strokeColor: (text.styles.strokeWidth ?? 'black') as never,
	};
};
