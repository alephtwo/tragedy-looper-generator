import { randomInt } from "../util/randomInt";
import { m } from "../paraglide/messages";

export class Deck<T> {
  readonly #cards: Array<T>;

  constructor(cards: Array<T>) {
    // Don't want to keep the original reference for immutability's sake
    this.#cards = [...cards];
  }

  draw(): T {
    if (this.#cards.length === 0) {
      throw new NoCardsRemainingError(m["errors.drawingFromDeckWithNoCards"]());
    }

    const index = randomInt(this.#cards.length);
    return this.#drawByIndex(index);
  }

  pull(n: number): Array<T> {
    if (this.#cards.length === 0) {
      throw new NoCardsRemainingError(m["errors.pullingFromDeckWithNoCards"]({ n }));
    }

    const pulled: Array<T> = [];
    for (let i = 0; i < n; i++) {
      pulled.push(this.draw());
    }
    return pulled;
  }

  select(selector: (card: T) => boolean) {
    // Filter down to the cards that match the criteria.
    // Attach their index, we'll need it later.
    const candidates = this.#cards.map((card, i) => ({ i, card })).filter(({ card }) => selector(card));

    // If there aren't any candidates left, we're done, we have to stop.
    if (candidates.length === 0) {
      throw new NoCardsRemainingError(m["errors.selectingFromADeckWithNoCards"]());
    }

    // Pick one of the candidates and draw it by its index.
    const index = randomInt(candidates.length);
    const { i } = candidates[index];
    return this.#drawByIndex(i);
  }

  remaining(): Array<T> {
    return this.#cards;
  }

  #drawByIndex(index: number): T {
    return this.#cards.splice(index, 1)[0];
  }
}

export class NoCardsRemainingError extends Error {
  constructor(message: string) {
    super(message);
  }
}
