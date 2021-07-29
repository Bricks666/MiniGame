import { MediaLoader } from "./MediaLoader";

export class ImageLoader extends MediaLoader {
  constructor(imageSrc) {
    super(imageSrc);
  }

  load() {
    return super.load(Image);
  }
}
