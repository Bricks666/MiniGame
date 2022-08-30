import { Coordinate, Size } from './types';
import { collide } from './utils';

export interface RectProperties extends Coordinate, Size {}

export type RectParams = Partial<RectProperties>;

export type Center = [number, number];

export class Rect {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(options: RectParams = {}) {
		const {
			height = 0, width = 0, x = 0, y = 0,
		} = options;
		this.height = height;
		this.width = width;
		this.x = x;
		this.y = y;
	}

	get centerX(): number {
		return (this.x + this.width) / 2;
	}

	set centerX(otherCenterX: number) {
		this.x = otherCenterX - this.width / 2;
	}

	get centerY(): number {
		return (this.y + this.height) / 2;
	}

	set centerY(otherCenterY: number) {
		this.y = otherCenterY - this.height / 2;
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
		return Rect.collideRect(this, rect);
	}

	collidePoint(point: Coordinate): boolean {
		return Rect.collidePoint(this, point);
	}

	static collideRect(rect1: RectProperties, rect2: RectProperties): boolean {
		const isCollideX: boolean = collide(
			rect1.x,
			rect1.width,
			rect2.x,
			rect2.width
		);
		const isCollideY: boolean = collide(
			rect1.y,
			rect1.height,
			rect2.y,
			rect2.height
		);
		return isCollideX && isCollideY;
	}

	static collidePoint(rect1: RectProperties, point: Coordinate): boolean {
		const isCollideX: boolean = collide(rect1.x, rect1.width, point.x, 0);
		const isCollideY: boolean = collide(rect1.y, rect1.height, point.y, 0);
		return isCollideX && isCollideY;
	}
}
