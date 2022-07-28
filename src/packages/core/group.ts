import { Screen } from '@/Screen';
import { Sprite } from './sprite';

export interface GroupOptions {
	readonly sprites?: Sprite[];
}

export class Group {
	readonly sprites: Set<Sprite>;

	constructor(options: GroupOptions = {}) {
		const { sprites } = options;
		this.sprites = new Set();

		if (sprites) {
			sprites.forEach((sprite) => this.add(sprite));
		}
	}

	update(): void {}

	draw(screen: Screen): void {
		this.sprites.forEach((sprite) => sprite.draw(screen));
	}

	add(sprite: Sprite): void {
		this.sprites.add(sprite);
		sprite.add(this);
	}

	remove(sprite: Sprite): void {
		this.sprites.delete(sprite);
		sprite.remove(this);
	}
}
