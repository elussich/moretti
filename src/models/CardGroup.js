export default class CardGroup {
  constructor(index) {
    this.index = index;
    this.cards = [];
  }
  add(card) {
    this.cards.push(card);
  }
  remove(card) {
    let index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }
  findCardById(cardId) {
    return this.cards.find(card => card.id === cardId);
  }
  isLast(card) {
    return this.cards[this.cards.length - 1] === card;
  }
  getLastCard() {
    return this.cards.length ? this.cards[this.cards.length - 1] : null;
  }
  isLadderHead() {}
}
