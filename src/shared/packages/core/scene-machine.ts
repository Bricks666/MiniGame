import { Display } from '../display';
import { UnitsBlock } from '../units';
import {
	Drawable,
	Key,
	StateDict,
	StateMachine,
	StateMachineOptions
} from './types';

export type SceneDict<K extends Key> = StateDict<K, UnitsBlock>;

export type SceneMachineOptions<K extends Key> = StateMachineOptions<
	K,
	UnitsBlock
>;

export class SceneMachine<K extends Key>
	extends StateMachine<K, UnitsBlock>
	implements Drawable
{
	changeState(key: K): void {
		this.current?.destroy?.();
		super.changeState(key);
		this.current?.onMount();
		this.current?.start();
	}

	draw(display: Display): void {
		this.current?.draw(display);
	}

	update(): void {
		this.current?.update();
	}
}
