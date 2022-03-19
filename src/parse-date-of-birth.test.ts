import { parseDateOfBirth } from "./parse-date-of-birth";

describe("Parse date of birth", () => {
  it("should parse the date of birth from a personal number", () => {
    expect(parseDateOfBirth("19850823")).toEqual(new Date("1985-08-23"));
  });

  it("should parse the date of birth from a co-ordination number", () => {
    expect(parseDateOfBirth("19850883")).toEqual(new Date("1985-08-23"));
  });
});
