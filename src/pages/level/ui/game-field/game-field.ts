import { domEventEmitter } from '@/shared/packages/events';
import { Rectangle } from '@/shared/packages/primitives';
import {
	Group,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';
import { Player } from '@/components';

export type GameFieldOptions = UnitsBlockOptions<GenerateOptions>;

interface GenerateOptions {
	readonly count: number;
}

export class GameField extends UnitsBlock<GenerateOptions> {
	constructor(options: GameFieldOptions = {}) {
		super({
			variant: 'fill',
			generateOptions: { count: 10, },
			...options,
		});
	}

	static generateUnits(shape: Rectangle): Group<Unit> {
		const player = new Player({
			health: 100,
			height: 64,
			width: 64,
			x: shape.innerLeft,
			y: shape.innerBottom - 64,
		});

		return new Group({ units: [player], });
	}

	onMount(): void {
		const player = this.units.find(
			(unit) => unit instanceof Player
		) as Player | null;
		if (!player) {
			return;
		}

		domEventEmitter.onKeyboardEvent(
			'keydown',
			'ArrowLeft',
			this.#moveLeft.bind(this, player)
		);
		domEventEmitter.onKeyboardEvent(
			'keydown',
			'ArrowRight',
			this.#moveRight.bind(this, player)
		);

		console.log('mount');
	}

	onUnmount(): void {
		console.log('unmount');
	}

	#moveLeft(player: Player) {
		console.log(player);
		if (this.shape.innerLeft > player.shape.x - 5) {
			return;
		}

		player.moveOn({ x: -5, y: 0, });
	}

	#moveRight(player: Player) {
		if (this.shape.innerRight < player.shape.x + 5) {
			return;
		}

		player.moveOn({ x: 5, y: 0, });
	}
}
