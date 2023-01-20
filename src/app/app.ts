import { Level, Main } from '@/pages';
import { DISPLAY_SIZE } from '@/shared/configs';
import { Engine, SceneDict, SceneMachine } from '@/shared/packages/core';
import { Display } from '@/shared/packages/display';
import { domEventEmitter, eventBus } from '@/shared/packages/events';
import { Loading } from '@/shared/ui';

type Scenes = 'level' | 'mainMenu' | 'loading';

export class Game extends Engine<Scenes> {
	constructor() {
		const display = new Display({
			...DISPLAY_SIZE,
			style: {
				display: 'block',
				margin: '0 auto',
				border: '1px solid black',
			},
		});

		const states: SceneDict<Scenes> = {
			level: new Level({ ...display.rect.sizes, }),
			mainMenu: new Main({ ...display.rect.sizes, }),
			loading: new Loading({ ...display.rect.sizes, }),
		};
		const sceneMachine = new SceneMachine<Scenes>({
			states,
		});
		super({ sceneMachine, display, });

		domEventEmitter.setDisplay(display);
		sceneMachine.changeState('level');
		console.log('aaa');
		this.#subscribe();
		console.log('aaa');
	}

	update() {
		super.update();
	}

	#subscribe() {
		eventBus.onChangeScene<Scenes>((key) => {
			console.log('CHange', key);
			this.sceneMachine.changeState(key);
		});
	}
}
