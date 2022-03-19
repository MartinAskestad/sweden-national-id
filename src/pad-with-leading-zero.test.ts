import { padWithLeadingZero } from "./pad-with-leading-zero";

describe("Pad with leading zero", () => {
  it("should pad a single digit with a leading zero", () => {
    expect(padWithLeadingZero(4)).toBe("04");
  });

  it("should not pad a double digit number", () => {
    expect(padWithLeadingZero(14)).toBe("14");
  });
});
