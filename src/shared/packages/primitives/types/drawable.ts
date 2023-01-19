import { Display } from '@/shared/packages/display';

export interface Drawable {
	draw(display: Display): void;
	update(): void;
}
