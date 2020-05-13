export default class Card {
  constructor(config) {
    const { number, figure } = config;
    this.number = number;
    this.figure = figure;
    this.id = `${figure}-${number}`;
    this.name = `${number} de ${figure}`;
  }
}
