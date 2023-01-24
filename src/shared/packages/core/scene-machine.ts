import { Display } from '../display';
import { Block } from '../game-objects';
import { Drawable } from '../types';
import { Key, StateDict, StateMachine, StateMachineOptions } from './types';

export type SceneDict<K extends Key> = StateDict<K, Block>;

export type SceneMachineOptions<K extends Key> = StateMachineOptions<K, Block>;

export class SceneMachine<K extends Key>
	extends StateMachine<K, Block>
	implements Drawable
{
	changeState(key: K): void {
		this.current?.destroy();
		super.changeState(key);
		this.current?.start();
	}

	draw(display: Display): void {
		this.current?.draw(display);
	}

	update(): void {
		this.current?.update();
	}
}
