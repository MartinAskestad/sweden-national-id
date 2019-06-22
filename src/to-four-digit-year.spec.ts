import { toFourDigitYear } from "./to-four-digit-year";

describe("To four digit year", () => {
  it("should convert convert a two digit year into a four digit one", () => {
    expect(toFourDigitYear(66)).toBe(1966);
  });

  it("should convert a one digit year to a four digit year", () => {
    expect(toFourDigitYear(6)).toBe(2006);
  });

  it("should convert a two digit year in the future to four digit year hundred years in the past", () => {
    const year = new Date().getFullYear() + 1;
    const twoDigitYear = year - 2000;
    expect(toFourDigitYear(twoDigitYear)).toBe(year - 100);
  });
});
