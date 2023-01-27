import { GameObject, GameObjectOptions } from '~/game-objects';
import { AttachPhysics } from '~/physics';

export interface EntityOptions extends GameObjectOptions {}

@AttachPhysics()
export class Entity extends GameObject {}
