import { hasBody, WithBody } from '../body';
import { isCollide } from './lib';
import { Unit } from '~/game-objects';
import { hasScript, Script } from '~/scripts';

export class World {
	readonly units: Set<WithBody<Unit>>;

	constructor() {
		this.units = new Set();
	}

	addUnit(unit: Unit) {
		if (!hasBody(unit)) {
			return this;
		}

		this.units.add(unit);
		return this;
	}

	removeUnit(unit: Unit): this {
		this.units.delete(unit as WithBody<Unit>);
		return this;
	}

	update() {
		this.resolveCollisions();
	}

	resolveCollisions(): void {
		const units = Array.from(this.units);
		for (let i = 0; i < units.length - 1; i += 1) {
			for (let j = i + 1; j < units.length; j += 1) {
				const object1 = units[i];
				const object2 = units[j];

				const collide = isCollide(object1.body, object2.body);
				if (!collide) {
					// eslint-disable-next-line no-continue
					continue;
				}

				if (hasScript(object1)) {
					(object1.script as Script<any>).onCollision(object2);
				}

				if (hasScript(object2)) {
					(object2.script as Script<any>).onCollision(object1);
				}
			}
		}
	}

	destroy() {
		this.units.forEach((body) => body.destroy());
	}
}
