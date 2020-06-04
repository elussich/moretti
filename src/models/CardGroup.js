export default class CardGroup {
  constructor(index) {
    this.index = index;
    this.cards = [];
  }
  add(card) {
    this.cards.push(card);

    let secondLast = this.cards[this.cards.length - 2];
    if (secondLast) {
      // check if added card is part of a ladder
      if (secondLast.ladder) {
        card.ladder = true;
        console.log(`${card.number} of ${card.figure} added to ladder`);
        console.log(this.cards);
      }
      // check if added card generates a ladder
      if (
        !secondLast.ladder &&
        secondLast.number === 10 &&
        card.number === 9 &&
        secondLast.figure !== card.figure
      ) {
        secondLast.ladder = true;
        card.ladder = true;

        console.log(
          `added ${card.number} of ${card.figure} to a ${secondLast.number} of ${secondLast.figure}, ...you just built a ladder!`
        );
        console.log(this.cards);
      }
    }
  }
  remove(card) {
    let index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }
  findById(cardId) {
    return this.cards.find(card => card.id === cardId);
  }
  isLast(card) {
    return this.cards[this.cards.length - 1] === card;
  }
  isLadderHead(card) {
    return card.number === 10 && card.ladder;
  }
}
