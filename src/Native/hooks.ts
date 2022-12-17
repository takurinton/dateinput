import dayjs, { Dayjs } from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { Day, Month, Selected, Year } from "../types";
import { isValidDate } from "../utils";

export const useInput = (date: Dayjs, onChange?: (date: Dayjs) => void) => {
  const [selected, setSelected] = useState<Selected>({
    y: date.format("YYYY") as Year,
    m: date.format("MM") as Month,
    d: date.format("DD") as Day,
  });
  const valid = useMemo(() => isValidDate(selected), [selected]);

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const y = event.target.value.slice(0, 4) as Year;
      const m = event.target.value.slice(5, 7) as Month;
      const d = event.target.value.slice(8, 10) as Day;

      setSelected({ y, m, d });

      // TODO: validation for native input
      if (isValidDate(selected)) {
        onChange && onChange(dayjs(`${y}-${m}-${d}`));
      }
    },
    [onChange]
  );

  return {
    selected,
    valid,
    handleDateChange,
  };
};
