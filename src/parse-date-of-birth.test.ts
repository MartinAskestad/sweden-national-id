import test from "ava";
import {
  isFutureDate,
  isUnder18,
  parseDateOfBirth,
} from "./parse-date-of-birth";

test("should parse the date of birth from a personal number", (t) => {
  t.deepEqual(parseDateOfBirth("19850823"), new Date("1985-08-23 00:00:00"));
});

test("should parse the date of birth from a co-ordination number", (t) => {
  t.deepEqual(parseDateOfBirth("19850883"), new Date("1985-08-23 00:00:00"));
});

test("should parse the date of birth from someone older than 100 years", (t) => {
  t.deepEqual(parseDateOfBirth("18850823"), new Date("1885-08-23 00:00:00"));
});

test("should return true if date of birth is in the future", (t) => {
  const dateOfBirth = new Date();
  const today = new Date();
  dateOfBirth.setFullYear(today.getFullYear() + 1);
  t.true(isFutureDate(dateOfBirth));
});

test("should return true if date of birth is more recent that 18 years", (t) => {
  const today = new Date();
  const dateOfBirth = new Date();
  dateOfBirth.setFullYear(today.getFullYear() - 12);
  t.true(isUnder18(dateOfBirth));
});
