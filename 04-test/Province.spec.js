import sampleProvinceData from "./sampleProvinceData";
import Province from "./Province";

describe("province", () => {
  it("shortfall", () => {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).toEqual(5);
  })
})