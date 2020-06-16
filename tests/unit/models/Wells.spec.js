import Card from "@/models/Card.js";
import Well from "@/models/Well.js";
import Wells from "@/models/Wells.js";

describe("Wells model", () => {
  it("should initialize correctly", () => {
    const wells = new Wells();
    expect(wells.wells).toHaveLength(4);
    wells.wells.forEach(well => {
      expect(well).toBeInstanceOf(Well);
    });
  });

  describe("`addCardToWell` method", () => {
    const wells = new Wells();
    const card = new Card({ number: 3, figure: "bastos" });
    const card2 = new Card({ number: 5, figure: "oros" });
    const card3 = new Card({ number: 7, figure: "copas" });
    wells.addCardToWell(card, 3);
    expect(wells.wells[3].cards[0]).toBe(card);
    wells.addCardToWell(card2, 1);
    expect(wells.wells[1].cards[0]).toBe(card2);
    wells.addCardToWell(card3, 3);
    expect(wells.wells[3].cards[1]).toBe(card3);
  });
});
