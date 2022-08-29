import { Scene } from '@/packages/core';
import { GameField } from './SceneParts/index';

export class Level extends Scene {
	constructor() {
		super();
		this.sceneParts.push(new GameField());
	}
}
