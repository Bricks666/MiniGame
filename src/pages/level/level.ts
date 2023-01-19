import {
	Group,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';
import { GameField } from './ui';

export type LevelOptions = UnitsBlockOptions<never>;

export class Level extends UnitsBlock {
	constructor(options: LevelOptions = {}) {
		super({
			...options,
			color: 'black',
		});
	}

	static generateUnits(): Group<Unit> {
		const units = [new GameField()];
		return new Group({ units, });
	}
}
