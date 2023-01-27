import { hasBody, WithBody } from '../body';
import { isCollide } from './lib';
import { GameObject } from '~/game-objects';

export class World {
	readonly gameObjects: Set<WithBody<GameObject>>;

	constructor() {
		this.gameObjects = new Set();
	}

	addGameObject(gameObject: GameObject) {
		if (!hasBody(gameObject)) {
			return this;
		}

		this.gameObjects.add(gameObject);
		return this;
	}

	removeGameObject(gameObject: GameObject): this {
		this.gameObjects.delete(gameObject as WithBody<GameObject>);
		return this;
	}

	update() {
		this.resolveCollisions();
	}

	resolveCollisions(): void {
		const units = Array.from(this.gameObjects);
		for (let i = 0; i < units.length - 1; i += 1) {
			for (let j = i + 1; j < units.length; j += 1) {
				const object1 = units[i];
				const object2 = units[j];

				const collide = isCollide(object1.body, object2.body);
				if (!collide) {
					// eslint-disable-next-line no-continue
					continue;
				}

				object1.scripts.forEach((script) => script.onCollision(object2));
				object2.scripts.forEach((script) => script.onCollision(object1));
			}
		}
	}

	destroy() {
		this.gameObjects.forEach((gameObject) => gameObject.destroy());
	}
}
