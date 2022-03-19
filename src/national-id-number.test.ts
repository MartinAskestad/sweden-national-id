import test from "ava";
import {
    CorporateIdNumberType,
    Gender,
    INationalIdNumber,
    parse,
    PersonalNumberType
} from "./national-id-number";
import { parseDateOfBirth } from "./parse-date-of-birth";

test("should return null if no id number is given", (t) => {
  const error = t.throws(() => {
    parse("");
  });
  t.is(error?.message, "value is null or empty");
});

test("should parse a valid 10-digit national id number", (t) => {
  const expected: INationalIdNumber = {
    dateOfBirth: new Date("1985-08-23 00:00:00"),
    gender: Gender.F,
    nationalIdNumber: "850823-6463",
    numberType: PersonalNumberType.personalNumber,
  };

  t.deepEqual(parse("8508236463"), expected);
});

test("should parse a valid 11-digit national id number of someone older than 100 years", (t) => {
  const res = parse("850823+6463");
  const expected: INationalIdNumber = {
    dateOfBirth: parseDateOfBirth("18850823"),
    gender: Gender.F,
    nationalIdNumber: "850823+6463",
    numberType: PersonalNumberType.personalNumber,
  };
  t.deepEqual(res, expected);
});

test("should parse a valid 11-digit national id number", (t) => {
  const expected: INationalIdNumber = {
    dateOfBirth: new Date("1985-08-23 00:00:00"),
    gender: Gender.F,
    nationalIdNumber: "850823-6463",
    numberType: PersonalNumberType.personalNumber,
  };
  t.deepEqual(parse("850823-6463"), expected);
});

test("should parse a valid national 12-digit id number", (t) => {
  const expected: INationalIdNumber = {
    dateOfBirth: new Date("1985-08-23 00:00:00"),
    gender: Gender.F,
    nationalIdNumber: "850823-6463",
    numberType: PersonalNumberType.personalNumber,
  };
  t.deepEqual(parse("198508236463"), expected);
});

test("should parse a valid co-ordination number", (t) => {
  const expected: INationalIdNumber = {
    dateOfBirth: new Date("1985-08-23 00:00:00"),
    gender: Gender.F,
    nationalIdNumber: "850883-6460",
    numberType: PersonalNumberType.coOrdinationNumber,
  };
  t.deepEqual(parse("850883-6460"), expected);
});

test("should identify the gender of a national id number as Female", (t) => {
  const expected: INationalIdNumber = {
    dateOfBirth: new Date("1985-08-23 00:00:00"),
    gender: Gender.F,
    nationalIdNumber: "850883-6460",
    numberType: PersonalNumberType.coOrdinationNumber,
  };
  t.deepEqual(parse("850883-6460"), expected);
});

test("should identify the gender of a national id number as Male", (t) => {
  const expected: INationalIdNumber = {
    dateOfBirth: new Date("1979-11-14 00:00:00"),
    gender: Gender.M,
    nationalIdNumber: "791114-2011",
    numberType: PersonalNumberType.personalNumber,
  };
  t.deepEqual(parse("791114-2011"), expected);
});

test("should throw an error if unknown format is given", (t) => {
  const error = t.throws(() => {
    parse("791114-2011AA");
  });
  t.is(error?.message, "unknown format");
});

test("should return null if invalid birth date", (t) => {
  t.is(parse("791314-2019"), null);
});

test("should return null if validation of luhn fails", (t) => {
  t.is(parse("791114-2013"), null);
});

test("should identify a corporate id number", (t) => {
  const expected: INationalIdNumber = {
    nationalIdNumber: "556036-0793",
    numberType: CorporateIdNumberType.corporation,
  };
  t.deepEqual(parse("556036-0793"), expected);
});

test("should identify a number as a \"council\" number", (t) => {
  const expected: INationalIdNumber = {
    nationalIdNumber: "212000-0142",
    numberType: CorporateIdNumberType.council,
  };
  t.deepEqual(parse("212000-0142"), expected);
});

test("should identify a corporate id number with a leading 16", (t) => {
  const expected: INationalIdNumber = {
    nationalIdNumber: "556036-0793",
    numberType: CorporateIdNumberType.corporation,
  };
  t.deepEqual(parse("165560360793"), expected);
});

