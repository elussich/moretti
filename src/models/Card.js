export default class Card {
  ladder = false;
  constructor(config) {
    const { number, figure } = config;
    this.number = number;
    this.figure = figure;
    this.id = `${figure}-${number}`;
    this.name = `${number} de ${figure}`;
  }
  get symbol() {
    let str;
    switch (this.figure) {
      case "oros":
        str = "🌞";
        break;
      case "copas":
        str = "🍷";
        break;
      case "espadas":
        str = "⚔️";
        break;
      case "bastos":
        str = "🌵";
        break;
    }
    return str;
  }
  set ladder(ladder) {
    this.ladder = ladder;
  }
  setGroup(cardGroup) {
    this.cardGroup = cardGroup;
  }
}
