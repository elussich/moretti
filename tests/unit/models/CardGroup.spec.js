import Card from "@/models/Card.js";
import CardGroup from "@/models/CardGroup.js";

describe("CardGroup model", () => {
  it("should initialize correctly", () => {
    const cardGroup = new CardGroup(1);
    expect(cardGroup.index).toBe(1);
    expect(cardGroup.cards.length).toBe(0);
  });

  describe("`add` method", () => {
    it("should add the passed card to the inner `cards` array", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 1, figure: "oros" });
      cardGroup.add(card);
      expect(cardGroup.cards[0]).toBe(card);
    });
    it("should set `cardGroup` property to the current card group, for the added card", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 1, figure: "oros" });
      cardGroup.add(card);
      expect(card.cardGroup).toBe(cardGroup);
    });
  });

  describe("`findCardById` method", () => {
    it("should return the card corresponding to the passed id", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 1, figure: "oros" });
      cardGroup.add(card);
      expect(cardGroup.findCardById("oros-1")).toBe(card);
    });
    it("should return undefined if no match found", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 1, figure: "oros" });
      cardGroup.add(card);
      expect(cardGroup.findCardById("copas-2")).toBe(undefined);
    });
  });

  describe("`remove` method", () => {
    it("should remove the passed card from the inner cards array, if found", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 1, figure: "oros" });
      cardGroup.add(card);
      expect(cardGroup.cards.length).toBe(1);
      cardGroup.remove(card);
      expect(cardGroup.cards.length).toBe(0);
    });
    it("should do nothing, if card is not found", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 1, figure: "oros" });
      const card2 = new Card({ number: 2, figure: "copas" });
      cardGroup.add(card);
      expect(cardGroup.cards.length).toBe(1);
      cardGroup.remove(card2);
      expect(cardGroup.cards.length).toBe(1);
    });
  });

  describe("`isLast` method", () => {
    it("should return `true` if passed card is last on the inner cards array; otherwise `false`", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 3, figure: "espadas" });
      const card2 = new Card({ number: 5, figure: "bastos" });
      const card3 = new Card({ number: 9, figure: "copas" });
      cardGroup.add(card);
      cardGroup.add(card2);
      cardGroup.add(card3);
      expect(cardGroup.isLast(card)).toBe(false);
      expect(cardGroup.isLast(card3)).toBe(true);
    });
  });
});
