import { format } from "./format";
import { validate } from "./luhn";
import {
  isFutureDate as _isFutureDate,
  isUnder18 as _isUnder18,
  parseDateOfBirth,
} from "./parse-date-of-birth";
import { toFourDigitYear } from "./to-four-digit-year";

/**
 * Represents the legal gender of the personal-id-number.
 */
export enum Gender {
  F,
  M,
}

/**
 * Represents the type of company of a company-id number.
 */
export const enum CorporateIdNumberType {
  /**
   * An estate of a deceased person. In Swedish, dödsbo.
   */
  estate = 1, // Dödsbo
  /**
   * A city council. In Swedish, landssting eller kommun.
   */
  council = 2, // Stat, landsting, kommun eller församling
  /**
   * A foreign company
   */
  foreignCompany = 3, // Utländskt företag som bedriver näringsverksamhet eller äger fastigheter i Sverige
  /**
   * A joint-stock company.
   */
  corporation = 5, // Aktiebolag
  /**
   * A partnership.
   */
  soleTrader = 6, // Enkelt bolag
  /**
   * A type of credit union that exists in Sweden.
   */
  swedishCreditUnion = 7, // Ekonomisk förening
  /**
   * A non profit organization.
   */
  nonProfit = 8, // Ideel förening
  /**
   * A trading partnership.
   */
  tradingPartnership = 9, // Handelsbolag, kommanditbolag, enkelt bolag
}

/**
 * The type of id number.
 */
export const enum PersonalNumberType {
  /**
   * The national id number of a private individual.
   */
  personalNumber = 10,
  /**
   * The id number of a corporation of council.
   */
  coOrdinationNumber,
}

/*
 * Details of a personal id number.
 */
export type PersonalIdNumber = {
  /** The date of birth of a person if number is a personal or co-ordination number otherwise undefined. */
  dateOfBirth?: Date;
  /** The gender of the person if the number is a personal or co-ordination number otherwise undefined. */
  gender?: Gender;
  /** The number formatted according to official formating rules. */
  nationalIdNumber: string;
  isFutureDate: boolean;
  isUnder18: boolean;
  numberType: PersonalNumberType;
};

/**
 * Details of a corporate id number.
 */
export type CorporateIdNumber = {
  nationalIdNumber: string;
  numberType: CorporateIdNumberType;
};
/**
 * The details of the number that has been parsed.
 */
export type NationalIdNumber = PersonalIdNumber | CorporateIdNumber;

/**
 * Parses a string representing a Swedish National Id number and returns details about it.
 * @param value The id number to parse, it can be 10, 11 or 12 characters long.
 */
export function parse(value: string): NationalIdNumber | null {
  if (!value) {
    throw new Error("value is null or empty");
  }
  const nationalIdNumber = format(value);
  const hasPlus = value.indexOf("+") > -1;
  const dateOfBirth = parseDateOfBirth(
    `${toFourDigitYear(
      +nationalIdNumber.substr(0, 2)
    )}${nationalIdNumber.substr(2, 6)}`
  );
  if (!validate(nationalIdNumber)) {
    return null;
  }

  if (+nationalIdNumber.substr(2, 2) >= 20) {
    return {
      nationalIdNumber: nationalIdNumber.replace("+", "-"),
      numberType: +nationalIdNumber[0],
    };
  }

  if (isNaN(dateOfBirth as unknown as number)) {
    return null;
  }
  if (hasPlus) {
    dateOfBirth.setFullYear(dateOfBirth.getFullYear() - 100);
  }
  const gender: Gender = +nationalIdNumber[9] % 2 === 0 ? 0 : 1;
  const numberType =
    +nationalIdNumber.substr(4, 2) > 60
      ? PersonalNumberType.coOrdinationNumber
      : PersonalNumberType.personalNumber;
  const isFutureDate = _isFutureDate(dateOfBirth);
  const isUnder18 = _isUnder18(dateOfBirth);
  return {
    dateOfBirth,
    gender,
    nationalIdNumber,
    numberType,
    isFutureDate,
    isUnder18,
  };
}
