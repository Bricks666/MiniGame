import { ScenePart, ScenePartOptions } from '../../core';
import { ButtonOptions, Button } from '../button';

export interface ListOptions extends ScenePartOptions, CreateItemsOptions {}

export interface CreateItemsOptions {
	readonly items: ButtonOptions[];
	readonly align?: 'center';
}

export class List extends ScenePart {
	constructor(options: ListOptions) {
		const { items, align, ...rest } = options;
		super(rest);
		this.#createItems({ items, align });
	}

	#createItems(options: CreateItemsOptions): void {
		const { align, items } = options;
		const itemsCount = items.length;
		const centredElementIndex = align === 'center' ? itemsCount / 2 : 0;

		items.forEach((item, i) => {
			const element = new Button(item);
			element.rect.center = this.rect.center;
			element.rect.centerY += (i - centredElementIndex) * element.rect.height;
			this.units.add(element);
		});
	}
}
