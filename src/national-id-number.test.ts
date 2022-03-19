import {
  CorporateIdNumberType,
  Gender,
  INationalIdNumber,
  parse,
  PersonalNumberType
} from "./national-id-number";

describe("National id number", () => {
  describe("Personal numbers", () => {
    it("should return null if no id number is given", () => {
      expect(() => {
        parse("");
      }).toThrow(new Error("value is null or empty"));
    });

    it("should parse a valid 10-digit national id number", () => {
      const expected: INationalIdNumber = {
        dateOfBirth: new Date("1985-08-23"),
        gender: Gender.F,
        nationalIdNumber: "850823-6463",
        numberType: PersonalNumberType.personalNumber
      };

      expect(parse("8508236463")).toEqual(expected);
    });

    it("should parse a valid 11-digit national id number of someone older thant 100 years", () => {
      const expected: INationalIdNumber = {
        dateOfBirth: new Date("1885-08-23"),
        gender: Gender.F,
        nationalIdNumber: "850823+6463",
        numberType: PersonalNumberType.personalNumber
      };
      expect(parse("850823+6463")).toEqual(expected);
    });

    it("should parse a valid 11-digit national id number", () => {
      const expected: INationalIdNumber = {
        dateOfBirth: new Date("1985-08-23"),
        gender: Gender.F,
        nationalIdNumber: "850823-6463",
        numberType: PersonalNumberType.personalNumber
      };
      expect(parse("850823-6463")).toEqual(expected);
    });

    it("should parse a valid national 12-digit id number", () => {
      const expected: INationalIdNumber = {
        dateOfBirth: new Date("1985-08-23"),
        gender: Gender.F,
        nationalIdNumber: "850823-6463",
        numberType: PersonalNumberType.personalNumber
      };
      expect(parse("198508236463")).toEqual(expected);
    });

    it("should parse a valid co-ordination number", () => {
      const expected: INationalIdNumber = {
        dateOfBirth: new Date("1985-08-23"),
        gender: Gender.F,
        nationalIdNumber: "850883-6460",
        numberType: PersonalNumberType.coOrdinationNumber
      };
      expect(parse("850883-6460")).toEqual(expected);
    });

    it("should identify the gender of a national id number as Female", () => {
      const expected: INationalIdNumber = {
        dateOfBirth: new Date("1985-08-23"),
        gender: Gender.F,
        nationalIdNumber: "850883-6460",
        numberType: PersonalNumberType.coOrdinationNumber
      };
      expect(parse("850883-6460")).toEqual(expected);
    });

    it("should identify the gender of a national id number as Male", () => {
      const expected: INationalIdNumber = {
        dateOfBirth: new Date("1979-11-14"),
        gender: Gender.M,
        nationalIdNumber: "791114-2011",
        numberType: PersonalNumberType.personalNumber
      };
      expect(parse("791114-2011")).toEqual(expected);
    });

    it("should throw an error if unknown format is given", () => {
      expect(() => {
        parse("791114-2011AA");
      }).toThrow(new Error("unknown format"));
    });

    it("should return null if invalid birth date", () => {
      expect(parse("791314-2019")).toEqual(null);
    });

    it("should return null if validation of luhn fails", () => {
      expect(parse("791114-2013")).toEqual(null);
    });
  });

  describe("Corporate id numbers", () => {
    it("should identify a corporate id number", () => {
      const expected: INationalIdNumber = {
        nationalIdNumber: "556036-0793",
        numberType: CorporateIdNumberType.corporation
      };
      expect(parse("556036-0793")).toEqual(expected);
    });

    it('should identify a number as a "council" number', () => {
      const expected: INationalIdNumber = {
        nationalIdNumber: "212000-0142",
        numberType: CorporateIdNumberType.council
      };
      expect(parse("212000-0142")).toEqual(expected);
    });
  });
});
