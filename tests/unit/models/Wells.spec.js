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
});
