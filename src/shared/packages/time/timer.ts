export class Timer {
	static #lastTik = 0;

	static #currentTik = 0;

	static #delta = 0;

	static tick() {
		this.#lastTik = this.#currentTik;

		this.#currentTik = Date.now();

		if (this.#lastTik) {
			this.#delta = this.#currentTik - this.#lastTik;
		}
	}

	static get delta(): number {
		return this.#delta;
	}

	static get deltaS(): number {
		return this.delta / 1000;
	}
}
