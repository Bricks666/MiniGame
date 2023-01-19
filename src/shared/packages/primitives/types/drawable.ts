import { Display } from '@/shared/packages/display';

export interface Drawable {
	draw(screen: Display): void;
	update(): void;
}
