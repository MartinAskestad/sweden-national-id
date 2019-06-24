import { format } from "./format";
import { validate } from "./luhn";
import { parseDateOfBirth } from "./parse-date-of-birth";
import { toFourDigitYear } from "./to-four-digit-year";

export enum Gender {
  F,
  M
}

export interface INationalIdNumber {
  dateOfBirth: Date;
  gender: Gender;
  nationalIdNumber: string;
}

export function parse(value: string): INationalIdNumber | null {
  if (!value) {
    throw new Error("value is null or empty");
  }
  let idNumber = "";
  const hasPlus = value.indexOf("+") > -1;
  switch (value.length) {
    case 10:
      idNumber = `${toFourDigitYear(+value.substr(0, 2))}${value.substr(2)}`;
      break;
    case 11:
      idNumber = `${toFourDigitYear(+value.substr(0, 2))}${value.substr(
        2,
        4
      )}${value.substr(7)}`;
      break;
    case 12:
      idNumber = value;
      break;
    default:
      throw new Error("unknown format");
  }
  if (!validate(idNumber.substr(2))) {
    return null;
  }
  const dateOfBirth = parseDateOfBirth(idNumber.substr(0, 8));
  if (isNaN((dateOfBirth as unknown) as number)) {
    return null;
  }
  if (hasPlus) {
    dateOfBirth.setFullYear(dateOfBirth.getFullYear() - 100);
  }
  const gender: Gender = +idNumber[10] % 2 === 0 ? 0 : 1;
  const nationalIdNumber = format(idNumber);

  return { dateOfBirth, gender, nationalIdNumber };
}
