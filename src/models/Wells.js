import Well from "./Well.js";

const WELL_NUM = 8;

export default class Wells {
  constructor() {
    this.createWells();
  }

  createWells() {
    this.wells = [];
    for (let i = 0; i < WELL_NUM; i++) {
      this.wells[i] = new Well();
    }
  }

  serialize() {
    return this.wells.map(well => well.cards);
  }
}
