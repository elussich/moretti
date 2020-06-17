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

  describe("set ladder", () => {
    it("should not set added card as ladder, if there are no more than one card in the group", () => {
      const column = new Column(0);
      const card = new Card({ number: 10, figure: "oros" });
      column.add(card);
      expect(card.ladder).toBe(false);
    });
    it("should set added card as ladder, if it was not a ladder before, and previous last card was a ladder, and previous last card is one number higher", () => {
      const column = new Column(0);
      const card = new Card({ number: 10, figure: "oros" });
      const card2 = new Card({ number: 9, figure: "copas" });
      const card3 = new Card({ number: 3, figure: "bastos" });

      card.ladder = true;

      column.add(card);
      expect(card2.ladder).toBe(false);
      column.add(card2);
      expect(card2.ladder).toBe(true);

      // another card is added, but doesn't meet the conditions
      column.add(card3);
      // thus it is not set as a ladder...
      expect(card3.ladder).toBe(false);
    });
    it("should generate a new ladder, if it was not a ladder before, and previous last card was not a ladder either, and previous last card is a 10, and added card is a 9, and both cards are of different figure", () => {
      const column = new Column(0);
      const card = new Card({ number: 10, figure: "oros" });
      const card2 = new Card({ number: 9, figure: "copas" });

      column.add(card);
      expect(card.ladder).toBe(false);
      column.add(card2);
      expect(card.ladder).toBe(true);
      expect(card2.ladder).toBe(true);
    });
  });

  describe("`removeLadder` method", () => {
    it("should remove all cards marked as ladder from the inner cards array", () => {
      const column = new Column(0);
      const card = new Card({ number: 3, figure: "espadas" });
      const card2 = new Card({ number: 10, figure: "bastos" });
      const card3 = new Card({ number: 9, figure: "copas" });
      column.add(card);
      // cards 2 & 3 will create a ladder
      column.add(card2);
      column.add(card3);
      expect(column.cards.length).toBe(3);
      column.removeLadder();
      expect(column.cards.length).toBe(1);
    });
  });

  describe("`isLadderHead` method", () => {
    it("should return `true` if passed card is the head of a ladder; otherwise `false`", () => {
      const column = new Column(0);
      const card = new Card({ number: 10, figure: "espadas" });
      const card2 = new Card({ number: 9, figure: "bastos" });
      const card3 = new Card({ number: 8, figure: "copas" });
      column.add(card);
      column.add(card2);
      column.add(card3);
      expect(column.isLadderHead(card)).toBe(true);
      expect(column.isLadderHead(card3)).toBe(false);
    });
  });

  describe("`getLadder` method", () => {
    it("should return all cards of a ladder as an array", () => {
      const column = new Column(0);
      const card = new Card({ number: 3, figure: "espadas" });
      const card2 = new Card({ number: 10, figure: "bastos" });
      const card3 = new Card({ number: 9, figure: "copas" });
      column.add(card);
      // cards 2 & 3 will create a ladder
      column.add(card2);
      column.add(card3);
      expect(column.getLadder()).toEqual([card2, card3]);
    });
    it("should return an empty array if no ladder is present", () => {
      const column = new Column(0);
      const card = new Card({ number: 3, figure: "espadas" });
      const card2 = new Card({ number: 5, figure: "bastos" });
      const card3 = new Card({ number: 7, figure: "copas" });
      column.add(card);
      column.add(card2);
      column.add(card3);
      expect(column.getLadder()).toEqual([]);
    });
  });
});
