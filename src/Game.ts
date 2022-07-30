import {
	Engine, SceneDict, SceneMachine, Screen
} from '@/packages/core';
import { Level1 } from './Scenes/Level/Level1';

type Scenes = 'level';

class Game extends Engine<Scenes> {
	constructor() {
		const states: SceneDict<Scenes> = {
			level: new Level1(),
		};
		const sceneMachine = new SceneMachine<Scenes>({
			states,
			stateSceneKey: 'level',
		});
		const screen = new Screen({ height: 640, width: 640, });
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
