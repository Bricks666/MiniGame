import { DISPLAY_SIZE, HEADER_HEIGHT } from '@/consts/display';
import { List } from '@/packages/units';
import { eventBus } from '@/packages/events';

export class Menu extends List {
	constructor() {
		super({
			width: DISPLAY_SIZE.width,
			height: DISPLAY_SIZE.height - HEADER_HEIGHT,
			y: HEADER_HEIGHT,
			x: 0,
			color: 'black',
			gap: 20,
			items: [
				{
					text: 'Play',
					color: 'white',
					onClick: () => {
						eventBus.emitChangeScene('level');
					},
				},
				{
					text: 'Exit',
					color: 'white',
					onClick: () => {
						window.close();
					},
				},
			],
			align: 'center',
		});
	}
}
