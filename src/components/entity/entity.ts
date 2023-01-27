import { GameObject, GameObjectOptions } from '~/game-objects';
import { AttachPhysics } from '~/physics';

export interface EntityOptions extends GameObjectOptions {
	readonly health: number;
}

@AttachPhysics()
export class Entity extends GameObject {}
