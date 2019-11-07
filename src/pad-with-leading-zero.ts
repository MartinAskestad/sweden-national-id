export function padWithLeadingZero(n: number) {
  const retval = `0${n}`;
  return retval.slice(-2);
}
