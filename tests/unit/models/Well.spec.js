import Well from "@/models/Well.js";
import CardGroup from "@/models/CardGroup.js";

describe("Well model", () => {
  it("should initialize correctly", () => {
    const well = new Well();
    expect(well).toBeInstanceOf(CardGroup);
  });
});
