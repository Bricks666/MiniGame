import { Group } from '../group';
import { Typography } from '../typography';
import { Unit } from '../unit';
import { UnitsBlock, UnitsBlockOptions } from '../units-block';

export interface ListOptions
	extends UnitsBlockOptions<CreateItemsOptions>,
		CreateItemsOptions {}

export interface CreateItemsOptions {
	readonly items: Typography[];
	readonly gap: number;
	readonly align?: 'center';
}

export class List extends UnitsBlock<CreateItemsOptions> {
	constructor(options: ListOptions) {
		const { items, align, gap, ...rest } = options;
		super({
			...rest,
			generateOptions: {
				items,
				gap,
				align,
			},
		});
	}

	static generateUnits(
		block: UnitsBlock,
		options: CreateItemsOptions
	): Group<Unit> {
		const itemsCount = options.items.length;
		const centredElementIndex = options.align === 'center' ? itemsCount / 2 : 0;

		const units = options.items.map((item, i) => {
			item.shape.center = block.shape.center;
			item.shape.centerY +=
				(i - centredElementIndex) * item.shape.height + options.gap * i;

			return item;
		});

		return new Group({ units, });
	}
}
