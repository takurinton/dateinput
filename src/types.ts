import { Dayjs } from "dayjs";

type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type zeroToNine = 0 | oneToNine;
export type YMD = "y" | "m" | "d";
export type Year =
  | `19${zeroToNine}${zeroToNine}`
  | `20${zeroToNine}${zeroToNine}`;
export type Month = `0${oneToNine}` | `1${0 | 1 | 2}`;
export type Day =
  | `0${oneToNine}`
  | `1${zeroToNine}`
  | `2${zeroToNine}`
  | `3${0 | 1}`;
export type Selected = {
  y: Year;
  m: Month;
  d: Day;
};
export type Range = {
  startDate: Dayjs;
  endDate: Dayjs;
};
