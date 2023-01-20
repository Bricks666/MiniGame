import { keyNames, pressedKeys } from '@/shared/packages/events';
import { Rectangle } from '@/shared/packages/primitives';
import {
	Group,
	Unit,
	UnitsBlock,
	UnitsBlockOptions
} from '@/shared/packages/units';
import { Bullet, Enemy, Player } from '@/components';

export type GameFieldOptions = UnitsBlockOptions<GenerateOptions>;

interface GenerateOptions {
	readonly count: number;
}

export class GameField extends UnitsBlock<GenerateOptions> {
	#player: Player | null;

	#bullets: Group<Bullet>;

	#enemies: Group<Enemy>;

	readonly #maxBullets: number;

	constructor(options: GameFieldOptions = {}) {
		super({
			variant: 'fill',
			generateOptions: { count: 10, },
			...options,
		});

		this.#player = null;
		this.#bullets = new Group();
		this.#maxBullets = 6;

		this.#moveLeft = this.#moveLeft.bind(this);
		this.#moveRight = this.#moveRight.bind(this);
		this.#shoot = this.#shoot.bind(this);
	}

	static generateUnits(shape: Rectangle): Group<Unit> {
		const player = new Player({
			health: 100,
			height: 64,
			width: 64,
			x: shape.innerLeft,
			y: shape.innerBottom - 64,
		});

		const enemy = new Enemy({
			health: 4,
			height: 64,
			width: 64,
			x: shape.innerLeft,
			y: shape.innerTop,
		});

		return new Group({ units: [player, enemy], });
	}

	onMount(): void {
		const player = this.units.find(
			(unit) => unit instanceof Player
		) as Player | null;
		if (!player) {
			return;
		}

		this.#player = player;
	}

	update(): void {
		this.#bullets.forEach((bullet) => {
			const isOut = this.shape.innerTop <= bullet.shape.innerTop;
			if (!isOut) {
				bullet.kill();
			}
		});

		if (pressedKeys[keyNames.LEFT]) {
			this.#moveLeft();
		}
		if (pressedKeys[keyNames.RIGHT]) {
			this.#moveRight();
		}
		if (pressedKeys[keyNames.SPACE]) {
			this.#shoot();
		}

		super.update();
	}

	#moveLeft = () => {
		if (this.shape.innerLeft > (this.#player?.shape.innerLeft ?? 0) - 5) {
			return;
		}

		this.#player?.moveOn({ x: -5, y: 0, });
	};

	#moveRight = () => {
		if (this.shape.innerRight < (this.#player?.shape.innerRight ?? 0) + 5) {
			return;
		}

		this.#player?.moveOn({ x: 5, y: 0, });
	};

	#shoot = () => {
		const currentBulletsCount = this.#bullets.length;
		if (currentBulletsCount === this.#maxBullets) {
			return;
		}

		const bullet = this.#player?.shoot();

		if (!bullet) {
			return;
		}

		this.#bullets.add(bullet);
		this.units.add(bullet);
	};
}
