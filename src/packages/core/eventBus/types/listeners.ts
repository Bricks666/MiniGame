import { Key } from '../../types';

export type ChangeSceneListeners<K extends Key> = (scene: K) => unknown;
