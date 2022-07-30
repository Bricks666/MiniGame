import Game from './Game';
import { setTitle } from './packages/core';

window.onload = () => {
	setTitle('Gagaga');
	const miniGame = new Game();
	miniGame.start();
};
