import { Rectangle } from '@/shared/packages/primitives';
import { ButtonOptions, Button } from '../button';
import { Group } from '../group';
import { Unit } from '../unit';
import { UnitsBlock, UnitsBlockOptions } from '../units-block';

export interface ListOptions
	extends UnitsBlockOptions<CreateItemsOptions>,
		CreateItemsOptions {}

export interface CreateItemsOptions {
	readonly items: ButtonOptions[];
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
		shape: Rectangle,
		options: CreateItemsOptions
	): Group<Unit> {
		const itemsCount = options.items.length;
		const centredElementIndex = options.align === 'center' ? itemsCount / 2 : 0;

		const units = options.items.map((item, i) => {
			const element = new Button(item);
			element.shape.center = shape.center;
			element.shape.centerY +=
				(i - centredElementIndex) * element.shape.height + options.gap * i;

			return element;
		});

		return new Group({ units, });
	}
}
