import CardGroup from "./CardGroup";

export default class Column extends CardGroup {
  constructor(index) {
    super(index);
  }

  add(card) {
    super.add(card);

    let secondLast = this.cards[this.cards.length - 2];
    if (secondLast) {
      // check if added card is part of a ladder
      // @todo don't trigger at drawing time
      if (
        secondLast.ladder &&
        !card.ladder &&
        secondLast.number === card.number + 1
      ) {
        card.ladder = true;
        return;
      }
      // check if added card generates a ladder
      if (
        !secondLast.ladder &&
        secondLast.number === 10 &&
        card.number === 9 &&
        !card.ladder &&
        secondLast.figure !== card.figure
      ) {
        secondLast.ladder = true;
        card.ladder = true;
        return;
      }
    }
  }

  willAddCard(card) {
    const lastCard = this.getLastCard();
    if (!lastCard && card.number === 10) {
      return true;
    }
    if (
      lastCard &&
      lastCard.figure !== card.figure &&
      lastCard.number === card.number + 1
    ) {
      return true;
    }
    return false;
  }

  removeLadder() {
    this.cards = this.cards.filter(card => !card.ladder);
  }

  isLadderHead(card) {
    return card.number === 10 && card.ladder;
  }

  getLadder() {
    return this.cards.filter(card => card.ladder);
  }
}
