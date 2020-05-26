import CardGroup from "./CardGroup.js";

export default class Well extends CardGroup {
  constructor(index) {
    super(index);
  }
  setFigure(figure) {
    this.figure = figure;
  }
}
