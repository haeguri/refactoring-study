import statement from "./statement";
import invoices from "./data/invoices";
import plays from "./data/plays";

describe("statement", () => {
  const result = statement(invoices[0], plays);
  it(`Hamlet 공연의 관객이 55명이라면 비용은 650.00 달러여야 한다.`, () => {
    expect(result).toEqual(expect.stringContaining(`Hamlet: $650.00`));
  });

  it(`As You Like It 공연의 관객이 35명이라면 비용은 580.00 달러여야 한다.`, () => {
    expect(result).toEqual(expect.stringContaining(`As You Like It: $580.00`));
  });

  it(`Othello 공연의 관객이 40명이라면 비용은 $500.00 달러여야 한다.`, () => {
    expect(result).toEqual(expect.stringContaining(`Othello: $500.00`));
  });

  it(`세 공연의 비용의 합은 1,730.00 달러여야 한다.`, () => {
    expect(result).toEqual(expect.stringContaining(`총액: $1,730.00`));
  });

  it(`세 공연의 비용에 대한 적립 포인트는 47 점이여야 한다.`, () => {
    expect(result).toEqual(expect.stringContaining(`적립 포인트: 47점`));
  });
});
