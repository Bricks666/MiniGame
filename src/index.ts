import { GAME_NAME } from './consts/game';
import { Game } from './game';
import { setTitle, setIcon } from './packages/core';

window.onload = () => {
	setTitle(GAME_NAME);
	setIcon('./sprites/enemy.png');
	const miniGame = new Game();
	miniGame.start();
};
