import { GAME_NAME } from '@/shared/configs';
import { GameObject, GameObjectOptions } from '~/game-objects';
import { AttachSprite, Rectangle, Text } from '~/sprites';

export type HeaderOptions = GameObjectOptions;

@AttachSprite({
	Sprite: Rectangle,
	color: 'black',
})
export class Header extends GameObject {
	init(): void {
		const headerText = new Text({
			text: GAME_NAME,
			color: 'white',
			fontSize: 24,
		});
		headerText.centerX = this.centerX;
		headerText.centerY = this.centerY;
	}
}
