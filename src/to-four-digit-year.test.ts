import test from "ava";
import { toFourDigitYear } from "./to-four-digit-year";

test("should convert convert a two digit year into a four digit one", (t) => {
  t.is(toFourDigitYear(66), 1966);
});

test("should convert a one digit year to a four digit year", (t) => {
  t.is(toFourDigitYear(6), 2006);
});

test("should convert a two digit year in the future to four digit year hundred years in the past", (t) => {
  const year = new Date().getFullYear() + 1;
  const twoDigitYear = year - 2000;
  t.is(toFourDigitYear(twoDigitYear), year - 100);
});
