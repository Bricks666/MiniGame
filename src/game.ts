import {
	domEventEmitter,
	Engine,
	SceneDict,
	SceneMachine,
	Screen
} from '@/packages/core';
import { DISPLAY_SIZE } from './consts/display';
import { Level } from './scenes/Level/index';
import { Loading } from './scenes/Loading/index';
import { MainMenu } from './scenes/MainMenu/index';

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
		domEventEmitter.setDisplay(screen);
		const states: SceneDict<Scenes> = {
			level: new Level(),
			mainMenu: new MainMenu(),
			loading: new Loading(),
		};
		const sceneMachine = new SceneMachine<Scenes>({
			states,
			stateSceneKey: 'mainMenu',
		});
		super({ sceneMachine, screen, });
	}

	update() {
		this.screen.fill(
			{
				...DISPLAY_SIZE,
				x: 0,
				y: 0,
			},
			'black'
		);
		super.update();
	}
}
