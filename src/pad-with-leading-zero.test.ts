import test from "ava";
import { padWithLeadingZero } from "./pad-with-leading-zero";

test("should pad a single digit with a leading zero", (t) => {
  t.is(padWithLeadingZero(4), "04");
});

test("should not pad a double digit number", (t) => {
  t.is(padWithLeadingZero(14), "14");
});
