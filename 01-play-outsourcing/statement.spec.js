import statement from "./statement";
import invoices from "./data/invoices";
import plays from "./data/plays";

describe("statement", () => {
  describe(`이름이 "BigCo"이고, hamlet 공연의 관객이 55명이라면`, () => {
    const result = statement(invoices[0], plays);

    it(`비용은 650$여야 한다.`, () => {
      expect(result).stringContaining(`Hamlet: $650.00`);
    });
  });
});
