export default class CardGroup {
  constructor(index) {
    this.index = index;
    this.cards = [];
  }
  add(card) {
    card.setGroup(this);
    this.cards.push(card);

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
  remove(card) {
    let index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }
  removeLadder() {
    this.cards = this.cards.filter(card => !card.ladder);
  }
  findCardById(cardId) {
    return this.cards.find(card => card.id === cardId);
  }
  isLast(card) {
    return this.cards[this.cards.length - 1] === card;
  }
  isLadderHead(card) {
    return card.number === 10 && card.ladder;
  }
  getLadder() {
    return this.cards.filter(card => card.ladder);
  }
}
