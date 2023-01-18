import { Engine, SceneDict, SceneMachine, Screen } from '@/packages/core';
import { domEventEmitter, eventBus } from '@/packages/events';
import { DISPLAY_SIZE } from './consts/display';
import { fillRequestAdapter } from './packages/core/screen/lib';
import { Level } from './scenes/Level';
import { Loading } from './scenes/Loading';
import { MainMenu } from './scenes/MainMenu';

type Scenes = 'level' | 'mainMenu' | 'loading';

export class Game extends Engine<Scenes> {
	constructor() {
		const screen = new Screen({
			...DISPLAY_SIZE,
			style: {
				display: 'block',
				margin: '0 auto',
				border: '1px solid black',
			},
		});
		const states: SceneDict<Scenes> = {
			level: new Level(),
			mainMenu: new MainMenu(),
			loading: new Loading(),
		};
		const sceneMachine = new SceneMachine<Scenes>({
			states,
			stateSceneKey: 'mainMenu',
		});
		super({ sceneMachine, screen });

		domEventEmitter.setDisplay(screen);

		this.#subscribe();
	}

	update() {
		this.screen.draw(
			fillRequestAdapter({
				color: 'black',
				rect: {
					...DISPLAY_SIZE,
					x: 0,
					y: 0,
				},
			})
		);
		super.update();
	}

	#subscribe() {
		eventBus.onChangeScene<Scenes>((key) => {
			this.sceneMachine.changeState(key);
		});
	}
}
