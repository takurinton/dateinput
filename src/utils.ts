import dayjs from "dayjs";
import { Day, Month, Selected, Year, YMD } from "./types";

// get the last date of the specified month
// The reason I'm not using dayjs here is that dayjs increments a nonexistent date when given.
const daysInMonth = (year: Year, month: Month): Day =>
  dayjs(`${year}-${month}-01`).daysInMonth().toString() as Day;

// for year
// year is 1900-2099
const isValidYear = (value: Selected) => {
  const year = Number(value.y);
  return year >= 1900 && year <= 2099;
};

// for month
// month is 1-12
const isValidMonth = (value: Selected) => {
  const month = Number(value.m);
  return month >= 1 && month <= 12;
};

// for day
// check if the date exists in the specified month
const isValidDay = (value: Selected) => {
  const day = Number(value.d);
  const daysInMonth = dayjs(`${value.y}-${value.m}-01`).daysInMonth();
  return day >= 1 && day <= Number(daysInMonth);
};

// validate date format and date
export const isValidDate = (selected: Selected) =>
  `${selected.y}-${("00" + selected.m).slice(-2)}-${("00" + selected.d).slice(
    -2
  )}`.match(/^\d{4}-\d{2}-\d{2}$/) !== null &&
  dayjs(`${selected.y}-${selected.m}-${selected.d}`).isValid() &&
  isValidYear(selected) &&
  isValidMonth(selected) &&
  isValidDay(selected);

// for value argument of transformSelected
type ValueType<T> = T extends "y"
  ? Year
  : T extends "m"
  ? Month
  : T extends "d"
  ? Day
  : never;

// for setSelected hooks
// formatting is interposed when type is `m` or `d`
// This is part of the user experience
export const transformSelected = (
  selected: Selected,
  focusType: YMD,
  value: ValueType<typeof focusType>
): Selected => {
  switch (focusType) {
    case "y":
      return {
        ...selected,
        y: value,
      };
    case "m":
      const endDate = daysInMonth(selected.y, value);
      if (Number(selected.d) > Number(endDate)) {
        return {
          ...selected,
          m: value,
          d: endDate,
        };
      }
      if (isValidMonth({ ...selected, m: value })) {
        return {
          ...selected,
          m: value,
        };
      }
      return selected;
    case "d":
      if (isValidDate({ ...selected, d: value })) {
        return {
          ...selected,
          d: value,
        };
      }
      return selected;
  }
};
