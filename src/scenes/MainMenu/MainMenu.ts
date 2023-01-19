import { Scene } from '@/packages/units';
import { Header } from './ScenePart/Header';
import { Menu } from './ScenePart/Menu';

export class MainMenu extends Scene {
	constructor() {
		super();
		this.sceneParts.push(new Header());
		this.sceneParts.push(new Menu());
	}
}
