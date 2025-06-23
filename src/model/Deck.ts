import { randomInt } from "../util/randomInt";

export class Deck<T> {
  readonly #cards: Array<T>;

  constructor(cards: Array<T>) {
    // Don't want to keep the original reference for immutability's sake
    this.#cards = [...cards];
  }

  draw(): T {
    const index = randomInt(this.#cards.length);
    return this.#cards.splice(index, 1)[0];
  }

  pull(n: number): Array<T> {
    const pulled: Array<T> = [];
    for (let i = 0; i < n; i++) {
      pulled.push(this.draw());
    }
    return pulled;
  }

  remaining(): Array<T> {
    return this.#cards;
  }
}
