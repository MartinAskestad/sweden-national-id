import { Gender, parse } from "./national-id-number";

describe("National id number", () => {
  it("should return null if no id number is given", () => {
    expect(() => {
      parse("");
    }).toThrow(new Error("value is null or empty"));
  });

  it("should parse a valid 10-digit national id number", () => {
    expect(parse("8508236463").dateOfBirth).toEqual(new Date("1985-08-23"));
  });

  it("should parse a valid 11-digit national id number of someone older thant 100 years", () => {
    expect(parse("850823+6463").dateOfBirth).toEqual(new Date("1885-08-23"));
  });

  it("should parse a valid 11-digit national id number", () => {
    expect(parse("850823-6463").dateOfBirth).toEqual(new Date("1985-08-23"));
  });

  it("should parse a valid national 12-digit id number", () => {
    expect(parse("198508236463").dateOfBirth).toEqual(new Date("1985-08-23"));
  });

  it('should parse a valid "sammordningsnummer"', () => {
    expect(parse("850883-6460").dateOfBirth).toEqual(new Date("1985-08-23"));
  });

  it("should identify the gender of a national id number as Female", () => {
    expect(parse("850883-6460").gender).toBe(Gender.F);
  });

  it("should identify the gender of a national id number as Male", () => {
    expect(parse("791114-2011").gender).toBe(Gender.M);
  });

  it("should throw an error if unknown format is given", () => {
    expect(() => {
      parse("791114-2011AA");
    }).toThrow(new Error("unknown format"));
  });

  it("should return null if invalid birth date", () => {
    expect(parse("791314-2011")).toEqual(null);
  });

  it("should return null if validation of luhn fails", () => {
    expect(parse("791114-2013")).toEqual(null);
  });
});
