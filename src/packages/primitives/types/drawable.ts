import { Display } from '@/packages/display';

export interface Drawable {
	draw(screen: Display): void;
	update(): void;
}
