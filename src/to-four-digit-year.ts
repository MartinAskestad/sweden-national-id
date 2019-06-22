export function toFourDigitYear(year: number): number {
  const maxYear = new Date().getFullYear();
  const a = maxYear % 100;
  const b = year - a;
  year = maxYear + b + (b > 0 ? -100 : 0);
  return year;
}
