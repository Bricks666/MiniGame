import { GameObject } from '@/shared/packages/game-objects';
import { AttachSprite, Text } from '@/shared/packages/sprites';

@AttachSprite({
	Sprite: Text,
	text: '0 POINTS',
	color: 'silver',
})
export class CurrentScorePoints extends GameObject {}
