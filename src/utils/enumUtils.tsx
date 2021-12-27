const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

export function ToArray(enumme: any) {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map((key) => enumme[key]);
}
