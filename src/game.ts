import { Engine, SceneDict, SceneMachine } from '@/packages/core';
import { domEventEmitter, eventBus } from '@/packages/events';
import { DISPLAY_SIZE } from './consts/display';
import { Display } from './packages/display';
import { Level } from './scenes/Level';
import { Loading } from './scenes/Loading';
import { MainMenu } from './scenes/MainMenu';

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
		//@ts-ignore
		const states: SceneDict<Scenes> = {
			level: new Level(),
			mainMenu: new MainMenu(),
			loading: new Loading(),
		};
		const sceneMachine = new SceneMachine<Scenes>({
			states,
			stateSceneKey: 'mainMenu',
		});
		super({ sceneMachine, display });

		domEventEmitter.setDisplay(display);

		this.#subscribe();
	}

	update() {
		super.update();
	}

	#subscribe() {
		eventBus.onChangeScene<Scenes>((key) => {
			this.sceneMachine.changeState(key);
		});
	}
}
