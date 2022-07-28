import Scene from './Scene';

class Loading extends Scene {
	constructor(game, imageSrc = null, musicSrc = null) {
		super(game, imageSrc, musicSrc);
	}

	init() {
		super.init();
	}

	update(time) {}

	render(time) {
		this.game.fill('#000000');
		this.game.print(310, 280, 'Loading...');

		super.render(time);
	}

	finish() {
		super.finish(Scene.LOADED);
	}
}

export default Loading;
