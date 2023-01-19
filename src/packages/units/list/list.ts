import { ButtonOptions, Button } from '../button';
import { ScenePart, ScenePartOptions } from '../scene-part';

export interface ListOptions extends ScenePartOptions, CreateItemsOptions {}

export interface CreateItemsOptions {
	readonly items: ButtonOptions[];
	readonly gap: number;
	readonly align?: 'center';
}

export class List extends ScenePart {
	constructor(options: ListOptions) {
		const { items, align, gap, ...rest } = options;
		super(rest);
		this.#createItems({ items, align, gap });
	}

	#createItems(options: CreateItemsOptions): void {
		const { align, items, gap } = options;
		const itemsCount = items.length;
		const centredElementIndex = align === 'center' ? itemsCount / 2 : 0;

		items.forEach((item, i) => {
			const element = new Button(item);
			element.shape.center = this.shape.center;
			element.shape.centerY +=
				(i - centredElementIndex) * element.shape.height + gap * i;
			this.units.add(element);
		});
	}
}
