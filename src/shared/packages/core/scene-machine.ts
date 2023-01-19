import { Display } from '../display';
import { Scene } from '../units';
import {
	Drawable,
	Key,
	StateDict,
	StateMachine,
	StateMachineOptions
} from './types';

export type SceneDict<K extends Key> = StateDict<K, Scene>;

export type SceneMachineOptions<K extends Key> = StateMachineOptions<K, Scene>;

export class SceneMachine<K extends Key>
	extends StateMachine<K, Scene>
	implements Drawable
{
	draw(display: Display): void {
		this.current.draw(display);
	}

	update(): void {
		this.current.update();
	}
}
