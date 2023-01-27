import { SPRITE_SIZE } from '@/shared/configs';
import { Enemies } from './enemies';
import { Enemy } from './enemy';
import { EnemyBullet } from './enemy-bullet';
import { Group } from '~/game-objects';
import { Vector } from '~/math';
import { WithBody } from '~/physics';
import { Script } from '~/scripts';
import { Rectangle } from '~/sprites';

export class EnemiesScript extends Script<Enemies> {
	columnCount = 5;

	rowCount = 5;

	#enemies: Group<WithBody<Enemy>> = new Group();

	#movementId: number | null = null;

	#shootId: number | null = null;

	#direction: Vector = new Vector(1, 0);

	#isEnd = false;

	init(): void {
		const view = this.gameObject.view as Rectangle<Enemies>;

		const centerColumn = this.columnCount / 2;
		const xStart = view.centerX - centerColumn * (SPRITE_SIZE + SPRITE_SIZE);

		for (let i = 0; i < this.columnCount; i += 1) {
			for (let j = 0; j < this.rowCount; j += 1) {
				new Enemy({
					height: SPRITE_SIZE,
					width: SPRITE_SIZE,
					x: xStart + (SPRITE_SIZE + SPRITE_SIZE) * i,
					y: view.innerTop + SPRITE_SIZE + (SPRITE_SIZE + SPRITE_SIZE) * j,
				}).addParent(this.gameObject);
			}
		}
	}

	start(): void {
		this.gameObject.children.forEach((child) => {
			if (child instanceof Enemy) {
				this.#enemies.add(child as WithBody<Enemy>);
			}
		});

		this.#movementId = setInterval(() => {
			this.#move();
		}, 500) as unknown as number;

		this.#shootId = setInterval(() => {
			this.#shoot();
		}, 1500) as unknown as number;
	}

	#move() {
		if (this.#isEnd) {
			this.#enemies.forEach((enemy) =>
				enemy.moveOn({
					x: 0,
					y: enemy.width,
				})
			);
			this.#isEnd = false;
			this.#direction.invert();
			return;
		}

		this.#enemies.forEach((enemy) =>
			enemy.moveOn({
				x: (SPRITE_SIZE / 4) * this.#direction.x,
				y: 0,
			})
		);
		this.#checkEnd();
	}

	#checkEnd(): void {
		const { innerLeft, innerRight, } = this.gameObject.view as Rectangle<any>;
		const step = SPRITE_SIZE / 4;

		this.#isEnd = !!this.#enemies.find(
			(enemy) => enemy.x - step < innerLeft || enemy.endX + step > innerRight
		);
	}

	#shoot() {
		const randomIndex = Math.floor(Math.random() * this.#enemies.length);
		const enemy = Array.from(this.#enemies.items)[randomIndex];

		new EnemyBullet({
			height: 17,
			width: 5,
			x: enemy.centerX,
			y: enemy.endY,
		})
			.addOnScene(enemy.scene)
			.start();
	}

	destroy(): void {
		if (this.#movementId) {
			clearInterval(this.#movementId);
		}

		this.#movementId = null;

		if (this.#shootId) {
			clearInterval(this.#shootId);
		}

		this.#shootId = null;

		this.#enemies.clear();

		super.destroy();
	}
}
