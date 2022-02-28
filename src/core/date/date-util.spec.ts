import { DateUtil } from "./date-util";

describe("toReadable", () => {
  it("should format the ISO date 2021-04-14T03:25:34+00:00 to more readable string 14.04.2021, 03:25", () => {
    expect(
      DateUtil.toReadable("2021-04-14T03:25:34+00:00", { targetTZ: "UTC" })
    ).toEqual("14.04.2021, 03:25");
  });

  it("should use the provided target timezone", () => {
    expect(
      DateUtil.toReadable("2021-04-14T03:25:34+00:00", {
        targetTZ: "Etc/GMT+3",
      })
    ).toEqual("14.04.2021, 00:25");
  });
});
