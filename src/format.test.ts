import test from "ava";
import { format } from "./format";

test("should format a 12-digit id number of a hundred year old", (t) => {
  t.is(format("188508236463"), "850823+6463");
});

test("should format a 12-digit id number", (t) => {
  t.is(format("198508236463"), "850823-6463");
});

test("should format a 10-digit id number", (t) => {
  t.is(format("8508236463"), "850823-6463");
});

test("should return a already formatted 11-digit id number", (t) => {
  t.is(format("850823-6463"), "850823-6463");
});

test("should throw an error when formatting invalid 11-digit id number", (t) => {
  const error = t.throws(function() {
    format("98508236463");
  });
  t.is(error?.message, "unknown format");
});

test("should throw an error when formatting invalid id number", (t) => {
  const error = t.throws(function() {
    format("1998508236463");
  });
  t.is(error?.message, "unknown format");
});

test("should throw an error when formatting empty id number", (t) => {
  const error = t.throws(function() {
    format("");
  });
  t.is(error?.message, "value is null or empty");
});
