import { MediaLoader } from './MediaLoader';

export class MusicLoader extends MediaLoader {
	constructor(musicSrc) {
		super(musicSrc);
	}

	load() {
		return super.load(Audio);
	}
}
