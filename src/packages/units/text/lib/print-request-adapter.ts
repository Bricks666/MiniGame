import { PaintRequest, RectProperties } from '../../../core';
import { RequiredTextStyleProperties } from '../types';
import { setTextStyle } from './set-text-style';

export interface PrintRequestAdapterParams {
	readonly text: string;
	readonly rect: RectProperties;
	readonly styles: RequiredTextStyleProperties;
}

export const printRequestAdapter = (
	params: PrintRequestAdapterParams
): PaintRequest<'text'> => {
	const { rect, text, styles } = params;
	return {
		type: 'text',
		rect,
		args: [text, rect.x, rect.y, rect.width],
		prepareContext: (context) => setTextStyle(context, styles),
	};
};
