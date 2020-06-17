import CardGroup from "./CardGroup.js";

export default class Well extends CardGroup {
  constructor(index) {
    super(index);
  }

  willAddCard(card) {
    const lastCard = this.getLastCard();
    if (!lastCard && card.number === 1) {
      return true;
    }
    if (
      lastCard &&
      lastCard.figure === card.figure &&
      lastCard.number === card.number - 1
    ) {
      return true;
    }
    return false;
  }
}
