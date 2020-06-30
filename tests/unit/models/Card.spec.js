import Card from "@/models/Card.js";

describe("Card model", () => {
  it("should initialize correctly", () => {
    const card = new Card({
      number: 9,
      figure: "oros"
    });
    expect(card.number).toBe(9);
    expect(card.figure).toBe("oros");
    expect(card.id).toBe("oros-9");
    expect(card.name).toBe("9 de oros");
    expect(card.ladder).toBe(false);
    expect(card.willReceive).toBe(false);
    expect(card.symbol).toBe("🌞");
  });

  it("should set `ladder` value", () => {
    const card = new Card({ number: 10, figure: "bastos" });
    expect(card.ladder).toBe(false);
    card.ladder = true;
    expect(card.ladder).toBe(true);
  });
});
