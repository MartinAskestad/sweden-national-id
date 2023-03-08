import { padWithLeadingZero } from "./pad-with-leading-zero";

export function parseDateOfBirth(dateOfBirth: string): Date {
  const year = +dateOfBirth.substr(0, 4);
  const month = dateOfBirth.substr(4, 2);
  let day = +dateOfBirth.substr(6, 2);
  if (day >= 32) {
    day -= 60;
  }
  const retval = new Date(
    `${year}-${month}-${padWithLeadingZero(day)} 00:0.000Z`
  );
  retval.setHours(0);
  retval.setMinutes(0);
  retval.setSeconds(0);
  return retval;
}

export function isFutureDate(dateOfBirth: Date): boolean {
  const today = new Date();
  return today < dateOfBirth;
}

export function isUnder18(dateOfBirth: Date): boolean {
  const today = new Date();
  let years = today.getFullYear() - dateOfBirth.getFullYear();
  if (
    today.getMonth() < dateOfBirth.getMonth() ||
    (today.getMonth() == dateOfBirth.getMonth() &&
      today.getDate() < dateOfBirth.getDate())
  ) {
    years--;
  }
  return years < 18;
}
