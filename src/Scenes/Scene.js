import { ImageLoader } from '../Loaders/ImageLoader';
import { MusicLoader } from '../Loaders/MusicLoader';

class Scene {
	#game;

	#status;

	#image;

	#imageLoaded;

	#music;

	#musicLoaded;

	constructor(game, imageSrc = null, musicSrc = null) {
		this.#game = game;

		this.#status = this.constructor.WORKING;

		this.#imageLoaded = true;
		this.#musicLoaded = true;

		if (imageSrc) {
			this.#imageLoaded = false;
			this.#loadImage(imageSrc);
		}

		if (musicSrc) {
			this.#musicLoaded = false;
			this.#loadMusic(musicSrc);
		}
	}

	static get WORKING() {
		return 'WORKING';
	}

	static get LOADED() {
		return 'LOADED';
	}

	static get START() {
		return 'START';
	}

	static get LOSE() {
		return 'LOSE';
	}

	static get WIN() {
		return 'WIN';
	}

	static get FINISHED() {
		return 'FINISHED';
	}

	get status() {
		return this.#status;
	}

	get game() {
		return this.#game;
	}

	get image() {
		return this.#image;
	}

	get music() {
		return this.#music;
	}

	get allMediaLoaded() {
		return this.#imageLoaded && this.#musicLoaded;
	}

	async #loadImage(imageSrc) {
		const loader = new ImageLoader(imageSrc);
		this.#image = await loader.load();
		this.#imageLoaded = true;
	}

	async #loadMusic(musicSrc) {
		const loader = new MusicLoader(musicSrc);
		this.#music = await loader.load();
		this.#musicLoaded = true;
	}

	init() {
		this.#status = this.constructor.WORKING;
	}

	render() {}

	finish(status) {
		this.#status = status;
	}
}

export default Scene;
