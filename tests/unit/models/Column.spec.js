import Card from "@/models/Card.js";
import Column from "@/models/Column.js";
import CardGroup from "@/models/CardGroup.js";

describe("Column model", () => {
  it("should initialize correctly", () => {
    const column = new Column(1);
    expect(column).toBeInstanceOf(CardGroup);
  });

  describe("willAddCard method", () => {
    it("should return `true` if column is empty and card to add is a ten", () => {
      const column = new Column(1);
      const card = new Card({ number: 10, figure: "oros" });
      expect(column.willAddCard(card)).toBe(true);

      column.add(card);
      const anotherTen = new Card({ number: 10, figure: "bastos" });
      expect(column.willAddCard(anotherTen)).toBe(false);
    });

    it("should return `true` if last card of column is of different figure and one number above check card", () => {
      const column = new Column(1);
      const card = new Card({ number: 8, figure: "oros" });
      column.add(card);

      const cardSameFigure = new Card({ number: 7, figure: "oros" });
      expect(column.willAddCard(cardSameFigure)).toBe(false);

      const cardSameNumber = new Card({ number: 8, figure: "bastos" });
      expect(column.willAddCard(cardSameNumber)).toBe(false);

      const cardNumberAbove = new Card({ number: 9, figure: "bastos" });
      expect(column.willAddCard(cardNumberAbove)).toBe(false);

      const cardNumberWayBelow = new Card({ number: 5, figure: "bastos" });
      expect(column.willAddCard(cardNumberWayBelow)).toBe(false);

      const cardFit = new Card({ number: 7, figure: "bastos" });
      expect(column.willAddCard(cardFit)).toBe(true);
    });
  });
});
