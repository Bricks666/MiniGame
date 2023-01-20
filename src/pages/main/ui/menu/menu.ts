import { eventBus } from '@/shared/packages/events';
import { Button, List, ListOptions } from '@/shared/packages/units';

export type MenuOptions = Omit<ListOptions, 'gap' | 'items' | 'align'>;

const items: Button[] = [
	new Button({
		text: 'Играть',
		color: 'silver',
		onClick() {
			eventBus.emitChangeScene('level');
		},
	}),
	new Button({
		text: 'Выйти',
		color: 'silver',
		onClick() {
			window.close();
		},
	})
];

export class Menu extends List {
	constructor(options: MenuOptions = {}) {
		super({
			color: 'black',
			gap: 15,
			items,
			align: 'center',
			...options,
		});
	}
}
