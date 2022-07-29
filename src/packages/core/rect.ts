import { Coordinate, Size } from './types';
import { collide } from './utils';

export interface RectOptions extends Coordinate, Size {}

export type Center = [number, number];

export class Rect {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(options?: RectOptions) {
		const {
			height = 0, width = 0, x = 0, y = 0,
		} = options || {};
		this.height = height;
		this.width = width;
		this.x = x;
		this.y = y;
	}

	get centerX(): number {
		return (this.x + this.width) / 2;
	}

	set centerX(otherCenterX: number) {
		this.x = otherCenterX * 2 - this.width;
	}
	get centerY(): number {
		return (this.y + this.height) / 2;
	}

	set centerY(otherCenterY: number) {
		this.y = otherCenterY * 2 - this.height;
	}

	get center(): Center {
		return [this.centerX, this.centerY,];
	}

	set center(otherCenter: Center) {
		[this.centerX, this.centerY,] = otherCenter;
	}

	moveTo(coordinate: Coordinate): Rect {
		this.x = coordinate.x;
		this.y = coordinate.y;

		return this;
	}

	moveOn(coordinate: Coordinate): Rect {
		this.x += coordinate.x;
		this.y += coordinate.y;

		return this;
	}

	collideRect(rect: Rect): boolean {
		const isCollideX: boolean = collide(this.x, this.width, rect.x, rect.width);
		const isCollideY: boolean = collide(
			this.y,
			this.height,
			rect.y,
			rect.height
		);
		return isCollideX || isCollideY;
	}
}
