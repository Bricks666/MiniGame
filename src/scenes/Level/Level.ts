import { Scene } from '@/packages/units';
import { GameField } from './SceneParts';

export class Level extends Scene {
	constructor() {
		super();
		this.sceneParts.push(new GameField());
	}
}
