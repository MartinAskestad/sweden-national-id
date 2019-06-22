import { format } from "./format";

describe("Format national id number", () => {
  it("should format a 12-digit id number", () => {
    expect(format("198508236463")).toBe("850823-6463");
  });

  it("should format a 10-digit id number", () => {
    expect(format("8508236463")).toBe("850823-6463");
  });

  it("should return a already formatted 11-digit id number", () => {
    expect(format("850823-6463")).toBe("850823-6463");
  });

  it("should throw an error when formatting invalid 11-digit id number", () => {
    expect(function() {
      format("98508236463");
    }).toThrow(new Error("unknown format"));
  });

  it("should throw an error when formatting invalid id number", () => {
    expect(function() {
      format("1998508236463");
    }).toThrow(new Error("unknown format"));
  });

  it("should throw an error when formatting empty id number", () => {
    expect(function() {
      format("");
    }).toThrow(new Error("value is null or empty"));
  });
});
