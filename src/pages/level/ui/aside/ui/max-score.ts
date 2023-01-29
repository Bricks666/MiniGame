import { GameObject } from '@/shared/packages/game-objects';
import { AttachSprite, Text } from '@/shared/packages/sprites';

@AttachSprite({
	Sprite: Text,
	text: 'Max score',
	color: 'silver',
})
export class MaxScore extends GameObject {}
