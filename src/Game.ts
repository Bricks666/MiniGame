import { Engine, EngineOptions, SceneDict } from '@/packages/core';
import { Level1 } from './Scenes/Level/Level1';

type Scenes = 'level';

export type GameOptions = Pick<EngineOptions<Scenes>, 'screen'>;

class Game extends Engine<Scenes> {
	constructor(options: GameOptions) {
		const states: SceneDict<Scenes> = {
			level: new Level1(),
		};
		super({ ...options, states, stateSceneKey: 'level', });
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
		this.sceneMachine.update();
		this.sceneMachine.draw(this.screen);

		super.update();
	}
}

export default Game;
