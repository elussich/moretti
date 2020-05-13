import { shuffle } from "../services/utils.js";
import Column from "./Column.js";
import Card from "./Card.js";

export default class Pack {
  constructor(cards) {
    this.createColumns();
    this.dealCards(shuffle(cards));
  }

  createColumns() {
    this.columns = [];
    for (let i = 0; i < 8; i++) {
      this.columns[i] = new Column();
    }
  }

  dealCards(cards) {
    let counter = 0;
    let columnCount = 0;
    while (counter < 40) {
      this.columns[columnCount].add(new Card(cards[counter]));
      counter++;
      if (counter % 5 === 0) {
        columnCount++;
      }
    }
  }

  serialize() {
    return this.columns.map(column => column.cards);
  }
}
