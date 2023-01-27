import { Unit, UnitOptions } from '~/game-objects';
import { AttachPhysics } from '~/physics';

export interface EntityOptions extends UnitOptions {
	readonly health: number;
}

@AttachPhysics()
export class Entity extends Unit {}
