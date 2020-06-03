import { shuffle } from "../services/utils.js";
import CardGroup from "./CardGroup.js";
import Card from "./Card.js";

const COL_NUM = 8;
const CARDS_NUM = 40;

export default class Pack {
  constructor(cards) {
    this.createColumns();
    this.dealCards(shuffle(cards));
  }

  createColumns() {
    this.columns = [];
    for (let i = 0; i < COL_NUM; i++) {
      this.columns[i] = new CardGroup(i);
    }
  }

  dealCards(cards) {
    const cardsPerColumn = CARDS_NUM / COL_NUM;
    let counter = 0;
    let columnCount = 0;
    while (counter < CARDS_NUM) {
      this.columns[columnCount].add(new Card(cards[counter]));
      counter++;
      if (counter % cardsPerColumn === 0) {
        columnCount++;
      }
    }
  }

  removeCardById(cardId) {
    let card;
    this.columns.find(column => {
      card = column.findById(cardId);
      if (card) {
        column.remove(card);
      }
      return card;
    });
    return card;
  }

  addCardToColumn(card, columnIndex) {
    this.columns[columnIndex].add(card);
  }
}
