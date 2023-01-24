import { Game } from '@/app';
import { GAME_NAME } from '@/shared/configs';
import { setTitle, setIcon } from '~/display';

window.onload = () => {
	setTitle(GAME_NAME);
	setIcon('./sprites/enemy.png');
	const miniGame = new Game();
	miniGame.start();
};
