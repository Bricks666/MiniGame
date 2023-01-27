import { Display } from '~/display';

export interface GameObjectLifeCycle {
	init(): void;
	start(): void;
	update(): void;
	render(display: Display): void;
	destroy(): void;
}
