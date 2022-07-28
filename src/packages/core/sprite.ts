/* eslint-disable class-methods-use-this */
import { Screen } from '@/Screen';
import { Group } from './group';
import { Rect, RectOptions } from './rect';

export class Sprite {
	rect: Rect;
	image: HTMLImageElement;
	private readonly groups: Set<Group>;

	constructor(rect: RectOptions) {
		this.rect = new Rect(rect);
		this.groups = new Set();
		this.image = new Image();
		this.image.src = './assets/img/Player.png';
		this.image.setAttribute('style', 'background-color: black;');
	}

	update(): void {
		return;
	}

	draw(screen: Screen): void {
		screen.draw(this.rect, this.image);
	}

	add(group: Group): void {
		this.groups.add(group);
	}

	remove(group: Group): void {
		this.groups.delete(group);
	}
}
