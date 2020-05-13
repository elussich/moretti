export default class Column {
  constructor() {
    this.cards = [];
  }
  add(card) {
    this.cards.push(card);
    console.log("Column.add()", card);
  }
}
