import { Text } from '../text';
import { Block, BlockOptions, Group } from '~/game-objects';

export interface ListOptions extends BlockOptions, CreateItemsOptions {}

export interface CreateItemsOptions {
	readonly items: Text[];
	readonly gap: number;
	readonly align?: 'center';
}

export abstract class List extends Block {
	constructor(options: ListOptions) {
		const { /* items, align, gap, */ ...rest } = options;
		super({
			...rest,
		});
	}

	static generateUnits(block: Block, options: CreateItemsOptions): Group {
		const itemsCount = options.items.length;
		const centredElementIndex = options.align === 'center' ? itemsCount / 2 : 0;

		const units = options.items.map((item, i) => {
			item.centerX = block.centerX;
			item.centerY = block.centerY;
			item.centerY += (i - centredElementIndex) * item.height + options.gap * i;

			return item;
		});

		return new Group({ units, });
	}
}
