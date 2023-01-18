import { Screen } from '../screen';

export interface Drawable {
	draw(screen: Screen): void;
	update(): void;
}
