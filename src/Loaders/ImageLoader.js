import { MediaLoader } from './MediaLoader';

export class ImageLoader extends MediaLoader {
	load() {
		return super.load(Image);
	}
}
