/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Screen } from './Screen';
import { Group } from './group';
import { Rect, RectParams } from './rect';
import { SpriteImage } from './sprite-image';
import { Drawable } from './index';

export interface SpriteOptions extends RectParams {
	readonly imageSrc: string;
}

export class Sprite implements Drawable {
	rect: Rect;
	image: SpriteImage;

	readonly #groups: Set<Group<this>>;

	constructor(options: SpriteOptions) {
		const { imageSrc, } = options;
		this.rect = new Rect(options);
		this.#groups = new Set();
		this.image = new SpriteImage(imageSrc);
	}

	update<R extends Array<unknown>>(..._args: R): void {}

	draw<R>(screen: Screen, ..._args: R[]): void {
		screen.draw(this.rect, this.image.image);
	}

	add(group: Group<this>): void {
		this.#groups.add(group);
	}

	remove(group: Group<this>): void {
		this.#groups.delete(group);
	}

	kill(): void {
		this.#groups.forEach((group) => group.remove(this));
	}
}
