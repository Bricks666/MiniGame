import {
	Engine, SceneDict, SceneMachine, Screen
} from '@/packages/core';
import { Level } from './Scenes/Level';
import { Loading } from './Scenes/Loading';
import { MainMenu } from './Scenes/MainMenu';

type Scenes = 'level' | 'mainMenu' | 'loading';

class Game extends Engine<Scenes> {
	constructor() {
		const screen = new Screen({
			height: 640,
			width: 640,
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
		super({ sceneMachine, screen, });
	}

	update() {
		this.screen.fill(
			{
				height: 640,
				width: 640,
				x: 0,
				y: 0,
			},
			'white'
		);
		super.update();
	}
}

export default Game;
