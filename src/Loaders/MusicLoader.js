import { MediaLoader } from './MediaLoader';

export class MusicLoader extends MediaLoader {
	load() {
		return super.load(Audio);
	}
}
