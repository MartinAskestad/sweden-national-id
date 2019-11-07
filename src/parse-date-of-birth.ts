import { padWithLeadingZero } from "./pad-with-leading-zero";

export function parseDateOfBirth(dateOfBirth: string): Date {
  const year = +dateOfBirth.substr(0, 4);
  const month = dateOfBirth.substr(4, 2);
  let day = +dateOfBirth.substr(6, 2);

  if (day >= 32) {
    day -= 60;
  }
  return new Date(`${year}-${month}-${padWithLeadingZero(day)}`);
}
