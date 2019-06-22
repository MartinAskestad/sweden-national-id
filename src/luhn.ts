/**
 * Validates a swedish national id number.
 * @param value the national id number to be validated.
 */
export function validate(value: string): boolean {
  const idNumber = value.replace(/\D/g, "").split("");
  if (idNumber.length !== 10) {
    return false;
  }

  const result = idNumber
    .map((c, idx) => (idx % 2 === 0 ? +c * 2 : +c))
    .map(n => (n > 9 ? n - 9 : n))
    .reduce((acc, val) => acc + val);

  return result % 10 === 0;
}
