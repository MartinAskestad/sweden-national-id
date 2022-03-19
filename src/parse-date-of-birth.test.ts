import test from "ava";
import { parseDateOfBirth } from "./parse-date-of-birth";

test("should parse the date of birth from a personal number", (t) => {
  t.deepEqual(parseDateOfBirth("19850823"), new Date("1985-08-23"));
});

test("should parse the date of birth from a co-ordination number", (t) => {
  t.deepEqual(parseDateOfBirth("19850883"), new Date("1985-08-23"));
});

test("should parse the date of birth from someone older than 100 years", t => {
  t.deepEqual(parseDateOfBirth("18850823"), new Date("1885-08-23"))
});
