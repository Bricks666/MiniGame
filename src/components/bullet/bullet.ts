import { Entity } from '../entity';

export class Bullet extends Entity {
	update(): void {
		super.update();
		console.log(
			this.x,
			this.y,
			this.body?.x,
			this.body?.y,
			this.view?.x,
			this.view?.y
		);
	}
}
