import { Coordinate, Size } from '@/packages/core';
import { Display } from '@/packages/display';
import { Drawable } from '../types';
import { collide } from './lib';

export interface PolygonOptions extends Coordinate, Size {}

export type Center = [number, number];

export abstract class Polygon implements Drawable {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(options: PolygonOptions) {
		this.x = options.x;
		this.y = options.y;
		this.height = options.height;
		this.width = options.width;
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
		return [this.centerX, this.centerY];
	}

	set center(otherCenter: Center) {
		[this.centerX, this.centerY] = otherCenter;
	}

	moveTo(coordinate: Coordinate): this {
		this.x = coordinate.x;
		this.y = coordinate.y;

		return this;
	}

	moveOn(coordinate: Coordinate): this {
		this.x += coordinate.x;
		this.y += coordinate.y;

		return this;
	}

	collideRect(polygon: Polygon): boolean {
		return Polygon.collidePolygon(this, polygon);
	}

	collidePoint(point: Coordinate): boolean {
		return Polygon.collidePoint(this, point);
	}

	static collidePolygon(polygon1: Polygon, polygon2: Polygon): boolean {
		const isCollideX: boolean = collide(
			polygon1.x,
			polygon1.width,
			polygon2.x,
			polygon2.width
		);
		const isCollideY: boolean = collide(
			polygon1.y,
			polygon1.height,
			polygon2.y,
			polygon2.height
		);
		return isCollideX && isCollideY;
	}

	static collidePoint(polygon1: Polygon, point: Coordinate): boolean {
		const isCollideX: boolean = collide(polygon1.x, polygon1.width, point.x, 0);
		const isCollideY: boolean = collide(
			polygon1.y,
			polygon1.height,
			point.y,
			0
		);
		console.log('[X]', isCollideX);
		console.log('[Y]', isCollideY);
		return isCollideX && isCollideY;
	}

	abstract draw(display: Display): void;
	abstract update(): void;
}
