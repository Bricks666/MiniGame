import { Key } from '../../../core';

export type ChangeSceneListeners<K extends Key> = (scene: K) => unknown;
