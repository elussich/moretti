import CardGroup from "./CardGroup";

export default class Column extends CardGroup {
  constructor(index) {
    super(index);
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
}
