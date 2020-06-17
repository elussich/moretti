import Card from "@/models/Card.js";
import Well from "@/models/Well.js";
import CardGroup from "@/models/CardGroup.js";

describe("Well model", () => {
  it("should initialize correctly", () => {
    const well = new Well();
    expect(well).toBeInstanceOf(CardGroup);
  });

  describe("willAddCard method", () => {
    it("should return `true` if well is empty and card to add is an ace", () => {
      const well = new Well();
      const card = new Card({ number: 1, figure: "oros" });
      expect(well.willAddCard(card)).toBe(true);

      well.add(card);
      const anotherAce = new Card({ number: 1, figure: "bastos" });
      expect(well.willAddCard(anotherAce)).toBe(false);
    });

    it("should return `true` if last card of column is of same figure and one number below check card", () => {
      const well = new Well();
      const card = new Card({ number: 3, figure: "oros" });
      well.add(card);

      const cardDifferentFigure = new Card({ number: 4, figure: "bastos" });
      expect(well.willAddCard(cardDifferentFigure)).toBe(false);

      const cardDifferentNumber = new Card({ number: 3, figure: "oros" });
      expect(well.willAddCard(cardDifferentNumber)).toBe(false);

      const cardNumberBelow = new Card({ number: 2, figure: "oros" });
      expect(well.willAddCard(cardNumberBelow)).toBe(false);

      const cardNumberWayAbove = new Card({ number: 7, figure: "oros" });
      expect(well.willAddCard(cardNumberWayAbove)).toBe(false);

      const cardFit = new Card({ number: 4, figure: "oros" });
      expect(well.willAddCard(cardFit)).toBe(true);
    });
  });
});
