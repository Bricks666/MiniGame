import { Screen } from '../Screen';

export interface Drawable {
	draw(screen: Screen): void;
	update(): void;
}
