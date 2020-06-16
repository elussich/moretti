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
    describe("set ladder", () => {
      it("should not set added card as ladder, if there are no more than one card in the group", () => {
        const cardGroup = new CardGroup(0);
        const card = new Card({ number: 10, figure: "oros" });
        cardGroup.add(card);
        expect(card.ladder).toBe(false);
      });
      it("should set added card as ladder, if it was not a ladder before, and previous last card was a ladder, and previous last card is one number higher", () => {
        const cardGroup = new CardGroup(0);
        const card = new Card({ number: 10, figure: "oros" });
        const card2 = new Card({ number: 9, figure: "copas" });
        const card3 = new Card({ number: 3, figure: "bastos" });

        card.ladder = true;

        cardGroup.add(card);
        expect(card2.ladder).toBe(false);
        cardGroup.add(card2);
        expect(card2.ladder).toBe(true);

        // another card is added, but doesn't meet the conditions
        cardGroup.add(card3);
        // thus it is not set as a ladder...
        expect(card3.ladder).toBe(false);
      });
      it("should generate a new ladder, if it was not a ladder before, and previous last card was not a ladder either, and previous last card is a 10, and added card is a 9, and both cards are of different figure", () => {
        const cardGroup = new CardGroup(0);
        const card = new Card({ number: 10, figure: "oros" });
        const card2 = new Card({ number: 9, figure: "copas" });

        cardGroup.add(card);
        expect(card.ladder).toBe(false);
        cardGroup.add(card2);
        expect(card.ladder).toBe(true);
        expect(card2.ladder).toBe(true);
      });
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

  describe("`getLadder` method", () => {
    it("should return all cards of a ladder as an array", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 3, figure: "espadas" });
      const card2 = new Card({ number: 10, figure: "bastos" });
      const card3 = new Card({ number: 9, figure: "copas" });
      cardGroup.add(card);
      // cards 2 & 3 will create a ladder
      cardGroup.add(card2);
      cardGroup.add(card3);
      expect(cardGroup.getLadder()).toEqual([card2, card3]);
    });
    it("should return an empty array if no ladder is present", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 3, figure: "espadas" });
      const card2 = new Card({ number: 5, figure: "bastos" });
      const card3 = new Card({ number: 7, figure: "copas" });
      cardGroup.add(card);
      cardGroup.add(card2);
      cardGroup.add(card3);
      expect(cardGroup.getLadder()).toEqual([]);
    });
  });

  describe("`removeLadder` method", () => {
    it("should remove all cards marked as ladder from the inner cards array", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 3, figure: "espadas" });
      const card2 = new Card({ number: 10, figure: "bastos" });
      const card3 = new Card({ number: 9, figure: "copas" });
      cardGroup.add(card);
      // cards 2 & 3 will create a ladder
      cardGroup.add(card2);
      cardGroup.add(card3);
      expect(cardGroup.cards.length).toBe(3);
      cardGroup.removeLadder();
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

  describe("`isLadderHead` method", () => {
    it("should return `true` if passed card is the head of a ladder; otherwise `false`", () => {
      const cardGroup = new CardGroup(0);
      const card = new Card({ number: 10, figure: "espadas" });
      const card2 = new Card({ number: 9, figure: "bastos" });
      const card3 = new Card({ number: 8, figure: "copas" });
      cardGroup.add(card);
      cardGroup.add(card2);
      cardGroup.add(card3);
      expect(cardGroup.isLadderHead(card)).toBe(true);
      expect(cardGroup.isLadderHead(card3)).toBe(false);
    });
  });
});
