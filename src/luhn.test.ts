import { validate } from "./luhn";

describe("Luhns algorithm", () => {
  it("should validate a correct national id number", () => {
    expect(validate("850823-6463")).toBe(true);
  });

  it('should validate a correct "sammordningsnummber"', () => {
    expect(validate("850883-6460")).toBe(true);
  });

  it("should return false if not enugh numbers are given", () => {
    expect(validate("850883-646")).toBe(false);
  });

  it("should return false if an incorrect number is given", () => {
    expect(validate("850883-6461")).toBe(false);
  });
});
