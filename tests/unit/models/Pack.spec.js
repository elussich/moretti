import Pack from "@/models/Pack.js";
import Card from "@/models/Card.js";
import CardGroup from "@/models/CardGroup.js";
import cards from "@/data/cards.js";

describe("Pack model", () => {
  it("should initialize correctly", () => {
    const pack = new Pack(cards);
    expect(pack.columns).toHaveLength(8);
    pack.columns.forEach(column => {
      expect(column).toBeInstanceOf(CardGroup);
      column.cards.forEach(card => expect(card).toBeInstanceOf(Card));
    });
  });

  it("should deal cards randomly for every new instance", () => {
    const pack = new Pack(cards);
    const cardsList = [];
    const pack2 = new Pack(cards);
    const cardsList2 = [];

    // create two list of cards IDs from different pack instances
    pack.columns.forEach(column => {
      column.cards.forEach(card => cardsList.push(card.id));
    });
    pack2.columns.forEach(column => {
      column.cards.forEach(card => cardsList2.push(card.id));
    });

    // compare concatenated strings to check they are effectively different
    expect(cardsList.join("")).not.toEqual(cardsList2.join(""));
  });

  describe("addCardToColumn method", () => {
    it("should add a passed card to the end of the column, indicated by its index", () => {
      const pack = new Pack(cards);
      const newCard = new Card({ number: 4, figure: "oros" });
      pack.addCardToColumn(newCard, 0);

      const firstColumnCards = pack.columns[0].cards;
      const foundCard = firstColumnCards[firstColumnCards.length - 1];

      expect(newCard).toBe(foundCard);
    });
  });

  describe("addLadderToColumn method", () => {
    it("should add a ladder of cards to the end of the column, indicated by its index", () => {
      const pack = new Pack(cards);
      const cardTen = new Card({ number: 10, figure: "oros" });
      const cardNine = new Card({ number: 9, figure: "bastos" });
      const cardEight = new Card({ number: 8, figure: "copas" });
      pack.addLadderToColumn([cardTen, cardNine, cardEight], 0);

      const firstColumnCards = pack.columns[0].cards;
      const cardTenClone = firstColumnCards[firstColumnCards.length - 3];
      const cardNineClone = firstColumnCards[firstColumnCards.length - 2];
      const cardEightClone = firstColumnCards[firstColumnCards.length - 1];

      expect(cardTen).toBe(cardTenClone);
      expect(cardNine).toBe(cardNineClone);
      expect(cardEight).toBe(cardEightClone);
    });
  });
});
