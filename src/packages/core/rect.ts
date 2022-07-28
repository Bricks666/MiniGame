export interface RectOptions {
	readonly x: number;
	readonly y: number;
	readonly width: number;
	readonly height: number;
}

export type Center = [number, number];

export class Rect {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(options: RectOptions) {
		this.height = options.height;
		this.width = options.width;
		this.x = options.x;
		this.y = options.y;
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
		return [this.centerX, this.centerY];
	}

	set center(otherCenter: Center) {
		[this.centerX, this.centerY] = otherCenter;
	}
}
