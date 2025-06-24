import { randomInt } from "../util/randomInt";
import { m } from "../paraglide/messages";

/**
 * Represents a "Deck" of objects.
 * Namely, things that can be drawn at random and a variety of other things.
 */
export class Deck<T> {
  readonly #cards: Array<T>;

  constructor(cards: Array<T>) {
    // Don't want to keep the original reference for immutability's sake
    this.#cards = [...cards];
  }

  /**
   * Determine how many cards are in the deck.
   * @returns The number of cards in the deck.
   */
  public get count(): number {
    return this.#cards.length;
  }

  /**
   * Draw a card from the deck at random.
   * @returns
   */
  draw(): T {
    if (this.#cards.length === 0) {
      throw new NoCardsRemainingError(m["errors.drawingFromDeckWithNoCards"]());
    }

    const index = randomInt(this.#cards.length);
    return this.#drawByIndex(index);
  }

  /**
   * Draw all the cards in the deck in a random order.
   * @returns The cards in a random order.
   */
  drawAll(): Array<T> {
    return this.pull(this.#cards.length);
  }

  /**
   * Draw a number of cards at random from the deck.
   * @param n The number of cards to draw
   * @returns The cards that were drawn
   */
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

  /**
   * Draw a card from the deck given some criteria.
   * @param selector The criteria to use to determine which cards can be drawn.
   * @returns The card that was removed
   * @throws If no cards can be drawn
   */
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

  /**
   * Look at a random card from the deck, but don't remove it.
   * @returns A random card from the deck
   */
  peek(): T {
    const index = randomInt(this.#cards.length);
    return this.#cards[index];
  }

  /**
   * Look at a random card from the deck but don't remove it.
   * @param filter The filter to use
   * @returns A random card that meets the filter
   */
  peekWhere(filter: (card: T) => boolean) {
    const candidates = this.#cards.filter(filter);
    const index = randomInt(candidates.length);
    return candidates[index];
  }

  /**
   * Look at the cards that remain in the deck.
   * @returns A copy of the cards that remain in the deck.
   */
  remaining(): Array<T> {
    return [...this.#cards];
  }

  /**
   * Pull a card out at a given index.
   * @param index The index of the card to remove
   * @returns The card that was removed
   */
  #drawByIndex(index: number): T {
    return this.#cards.splice(index, 1)[0];
  }
}

export class NoCardsRemainingError extends Error {
  constructor(message: string) {
    super(message);
  }
}
