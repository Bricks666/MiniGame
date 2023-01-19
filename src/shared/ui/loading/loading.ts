import { Rectangle } from '@/shared/packages/primitives';
import { Typography, UnitsBlock, Unit, Group } from '@/shared/packages/units';

export class Loading extends UnitsBlock {
	static generateUnits(shape: Rectangle): Group<Unit> {
		const group = new Group();
		const text = new Typography({
			text: 'Loading...',
			color: 'white',
		});
		text.shape.center = shape.center;
		group.add(text);

		return group;
	}
}
