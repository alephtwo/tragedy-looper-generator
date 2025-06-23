import { vi, describe, test, expect } from "vitest";
import { Deck } from "./Deck";
import { randomInt } from "../util/randomInt";

vi.mock("../util/randomInt");

describe("simple deck of numbers", () => {
  const cards = [1, 2, 3, 4, 5];

  test.each([
    { index: 0, leftovers: [2, 3, 4, 5] },
    { index: 1, leftovers: [1, 3, 4, 5] },
    { index: 2, leftovers: [1, 2, 4, 5] },
    { index: 3, leftovers: [1, 2, 3, 5] },
    { index: 4, leftovers: [1, 2, 3, 4] },
  ])("Draws card $index", ({ index, leftovers }) => {
    // Determine which index will be chosen
    vi.mocked(randomInt).mockReturnValue(index);

    // Create a deck from the known cards
    const deck = new Deck(cards);

    // See that we drew the right card
    const drawn = deck.draw();
    expect(drawn).toEqual(cards[index]);

    // See that the expected cards are still left in the deck
    expect(deck.remaining()).toEqual(leftovers);
  });

  test("Draws two cards", () => {
    // Determine which indexes will be chosen
    vi.mocked(randomInt).mockReturnValueOnce(1).mockReturnValueOnce(2);

    // Create a deck from the known cards
    const deck = new Deck(cards);

    // Pull two
    const pulled = deck.pull(2);
    expect(pulled).toEqual([2, 4]);

    // See that the expected cards are still left over
    expect(deck.remaining()).toEqual([1, 3, 5]);
  });
});
