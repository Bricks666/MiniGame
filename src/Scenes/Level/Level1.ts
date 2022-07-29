import { Scene } from '@/packages/core';
import { GameField } from './SceneParts';

export class Level1 extends Scene {
	constructor() {
		super();
		this.sceneParts.push(new GameField());
	}
}
