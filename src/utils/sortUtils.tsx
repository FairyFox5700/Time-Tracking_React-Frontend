export function descendingComparator<T>(
  a: T,
  b: T,
  orderBy: keyof T | undefined
) {
  if (!orderBy) {
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

export function getCustomComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key | undefined
): (
  a: { [key in Key]: number | string | Date | undefined },
  b: { [key in Key]: number | string | Date | undefined }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableCustomSort<T>(
  array: T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
