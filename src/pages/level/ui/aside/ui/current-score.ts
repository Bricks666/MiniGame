import { GameObject } from '@/shared/packages/game-objects';
import { AttachSprite, Text } from '@/shared/packages/sprites';

@AttachSprite({
	Sprite: Text,
	text: 'Current score',
	color: 'silver',
})
export class CurrentScore extends GameObject {}
