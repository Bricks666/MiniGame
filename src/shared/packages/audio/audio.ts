export interface AudioOptions {
	readonly src: string;
	readonly volume: number;
}

export class Audio {
	readonly #audio: HTMLAudioElement;

	#isReady: boolean;

	#isPlay: boolean;

	constructor(options: AudioOptions) {
		const { src, volume, } = options;
		this.#audio = new globalThis.Audio(src);
		this.#isReady = false;
		this.#isPlay = false;
		this.#audio.volume = Math.min(Math.max(volume, 0), 1);

		this.#audio.onload = () => {
			this.#isReady = true;
			if (this.isPlay) {
				this.play();
			}
		};
	}

	get isReady(): boolean {
		return this.#isReady;
	}

	get isPlay(): boolean {
		return this.#isPlay;
	}

	play() {
		this.#audio.play();
		this.#isPlay = true;
	}

	stop() {
		this.#audio.pause();
		this.#isPlay = false;
	}
}
