import Game from './Game';
import { Screen } from './Screen';

window.onload = () => {
	const screen = new Screen({ height: 640, width: 640 });
	const miniGame = new Game({ screen });
	miniGame.start();
};
