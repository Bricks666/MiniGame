/* eslint-disable class-methods-use-this */
import { Screen } from './screen';
import { Group } from './group';
import { Rect, RectOptions } from './rect';

export type SpriteOptions = RectOptions

export class Sprite {
	rect: Rect;
	image: HTMLImageElement;
	time: number;
	private readonly groups: Set<Group<this>>;

	constructor(options: SpriteOptions) {
		this.rect = new Rect(options);
		this.time = 0;
		this.groups = new Set();
		this.image = new Image();
		this.image.src = './assets/img/Player.png';
		this.image.setAttribute('style', 'background-color: black;');
	}

	update(): void {
		/** TODO */
		if (!(this.time % 60) && this.time) {
			this.rect.moveOn({
				x: 0,
				y: 64,
			});
		}

		this.time += 1;
		return undefined;
	}

	draw(screen: Screen): void {
		screen.draw(this.rect, this.image);
	}

	add(group: Group<this>): void {
		this.groups.add(group);
	}

	remove(group: Group<this>): void {
		this.groups.delete(group);
	}

	kill(): void {
		this.groups.forEach((group) => group.remove(this));
	}
}
