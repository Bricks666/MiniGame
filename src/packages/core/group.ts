import { Screen } from './screen';
import { Sprite } from './sprite';

export interface GroupOptions<T extends Sprite> {
	readonly sprites?: T[];
}

export class Group<T extends Sprite = Sprite> {
	readonly sprites: Set<T>;

	constructor(options: GroupOptions<T> = {}) {
		const { sprites, } = options;
		this.sprites = new Set<T>();

		if (sprites) {
			sprites.forEach((sprite) => this.add(sprite));
		}
	}

	update(): void {
		this.sprites.forEach((sprite) => sprite.update());
	}

	draw(screen: Screen): void {
		this.sprites.forEach((sprite) => sprite.draw(screen));
	}

	add(sprite: T): void {
		this.sprites.add(sprite);
		sprite.add(this);
	}

	remove(sprite: T): void {
		this.sprites.delete(sprite);
		sprite.remove(this);
	}

	has(sprite: T): boolean {
		return this.sprites.has(sprite);
	}

	clear(): void {
		this.sprites.forEach(this.remove.bind(this));
	}
}
