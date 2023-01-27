import { Level, Main } from '@/pages';
import { DISPLAY_SIZE } from '@/shared/configs';
import { Loading } from '@/shared/ui';
import { Engine } from '~/core';
import { Display } from '~/display';
import { domEventEmitter } from '~/events';

export class Game extends Engine {
	constructor() {
		const display = new Display({
			...DISPLAY_SIZE,
			style: {
				display: 'block',
				margin: '0 auto',
				border: '1px solid black',
			},
		});

		const states = {};

		super({ scenes: states, display, });
		states.level = new Level({
			shapeOptions: { width: display.rect.width, height: display.rect.height, },
			engine: this,
		});
		states.mainMenu = new Main({
			shapeOptions: { width: display.rect.width, height: display.rect.height, },
			engine: this,
		});
		states.loading = new Loading({
			shapeOptions: { width: display.rect.width, height: display.rect.height, },
			engine: this,
		});

		this.sceneMachine.changeState('level');
		domEventEmitter.setDisplay(display);
	}
}
