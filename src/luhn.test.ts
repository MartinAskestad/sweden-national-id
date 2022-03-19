import test from "ava";
import { validate } from "./luhn";

test("should validate a correct national id number", (t) => {
  t.true(validate("850823-6463"));
});

test("should validate a correct \"sammordningsnummer\"", (t) => {
  t.true(validate("850883-6460"));
});

test("should return false if not enough numbers are given", (t) => {
  t.false(validate("850883-646"));
});

test("should return false if an incorrect number is given", (t) => {
  t.false(validate("850883-6461"));
});
