import { format } from "./format";
import { validate } from "./luhn";
import { parseDateOfBirth } from "./parse-date-of-birth";
import { toFourDigitYear } from "./to-four-digit-year";

/**
 * Represents the legal gender of the personal-id-number.
 */
export enum Gender {
  F,
  M
}

/**
 * Represents the type of company of a company-id number.
 */
export enum CorporateIdNumberType {
  estate = 1, // Dödsbo
  council = 2, // Stat, landsting, komun eller församling
  foreignCompany = 3, // Utländskt företag som bedriver näringsverksamhet eller äger fastigheter i Sverige
  corporation = 5, // Aktiebolag
  soleTrader = 6, // Enkelt bolag
  swedishCreditUnion = 7, // Ekonomisk förening
  nonProfit = 8, // Ideel förening
  tradingPartnership = 9 // Handelsbolag, kommanditbolag, enkelt bolag
}

export enum PersonalNumberType {
  personalNumber = 10,
  coOrdinationNumber
}

/**
 * The details of the number that has been parsed.
 */
export interface INationalIdNumber {
  /** The date of birth of a person if number is a personal or co-ordination number otherwise undefined. */
  dateOfBirth?: Date;
  /** The gender of the person if the number is a personal or co-ordination number otherwise undefined. */
  gender?: Gender;
  /** The number formatted according to oficial formating rules. */
  nationalIdNumber: string;
  /** The type of number, a personal co-ordination or corporate id number. */
  numberType: PersonalNumberType | CorporateIdNumberType;
}

export function parse(value: string): INationalIdNumber | null {
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
      nationalIdNumber,
      numberType: +nationalIdNumber[0]
    };
  }

  if (isNaN((dateOfBirth as unknown) as number)) {
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
  return {
    dateOfBirth,
    gender,
    nationalIdNumber,
    numberType
  };
}
