import { Block } from './block';
import { GameObject, GameObjectOptions } from './game-object';

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
		block.addUnit(this);

		return this;
	}

	removeFromBlock(block: Block) {
		if (this.#block !== block) {
			return this;
		}

		this.#block = null as unknown as Block;

		block.removeUnit(this);

		return this;
	}

	destroy(): void {
		this.removeFromBlock(this.#block);

		super.destroy();
	}
}
