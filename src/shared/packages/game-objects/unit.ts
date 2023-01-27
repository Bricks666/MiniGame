import { Block } from './block';
import { GameObject, GameObjectOptions } from './game-object';
import { Scene } from '~/scene';

export interface UnitOptions extends GameObjectOptions {}

export class Unit extends GameObject {
	#block: Block;

	constructor(options: UnitOptions) {
		super(options);

		this.#block = null as unknown as Block;
	}

	get block(): Block {
		return this.#block;
	}

	addToBlock(block: Block) {
		if (this.block) {
			this.removeFromBlock(this.block);
		}

		this.#block = block;
		this.setScene(block.scene);
		block.addUnit(this);

		return this;
	}

	removeFromBlock(block: Block) {
		if (this.#block !== block) {
			return this;
		}

		this.#block = null as unknown as Block;
		this.setScene(null as unknown as Scene);

		block.removeUnit(this);

		return this;
	}

	destroy(): void {
		super.destroy();
		this.removeFromBlock(this.#block);
	}
}
