export default class CardGroup {
  constructor() {
    this.cards = [];
  }
  add(card) {
    this.cards.push(card);
    console.log("CardGroup.add()", card);
  }
}
