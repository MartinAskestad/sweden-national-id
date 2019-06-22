export function format(value: string): string {
  if (!value) {
    throw new Error("value is null or empty");
  }
  switch (value.length) {
    case 10:
      return `${value.substr(0, 6)}-${value.substr(6)}`;
    case 11:
      if (value[6] === "-" || value[6] === "+") {
        return value;
      } else {
        throw new Error("unknown format");
      }
    case 12:
      return `${value.substr(2, 6)}-${value.substr(8)}`;
    default:
      throw new Error("unknown format");
  }
}
