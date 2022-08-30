import { Scene } from '@/packages/core';
import { Header } from './ScenePart/Header';
import { Menu } from './ScenePart/Menu/Menu';

export class MainMenu extends Scene {
	constructor() {
		super();
		this.sceneParts.push(new Header());
		this.sceneParts.push(new Menu());
	}
}
