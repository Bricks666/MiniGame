import { Group } from './group';
import { Screen } from './screen';
import { Unit, UnitOptions } from './unit';

export interface ScenePartOptions extends UnitOptions {}

export class ScenePart<T extends Unit = Unit> extends Unit {
	protected readonly units: Group<T>;

	constructor(options: ScenePartOptions) {
		super(options);
		this.units = new Group();
	}

	update(): void {
		this.units.update();
	}

	draw(screen: Screen): void {
		this.units.draw(screen);
	}
}
