import { DISPLAY_SIZE, HEADER_HEIGHT } from '@/consts/display';
import { List } from '@/packages/components';
import { eventBus } from '@/packages/events';

export class Menu extends List {
	constructor() {
		super({
			rect: {
				width: DISPLAY_SIZE.width,
				height: DISPLAY_SIZE.height - HEADER_HEIGHT,
				y: HEADER_HEIGHT,
			},
			items: [
				{
					text: 'Play',
					fillStyle: 'white',
					onClick: () => {
						eventBus.emitChangeScene('level');
					},
				},
				{
					text: 'Exit',
					fillStyle: 'white',
					onClick: () => window.close(),
				},
			],
			align: 'center',
		});
	}
}
