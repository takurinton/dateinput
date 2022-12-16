import dayjs, { Dayjs } from "dayjs";
import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { isValidDate } from "./utils";
import { Selected, Year, Month, Day } from "./types";

type Props = {
  date: Dayjs;
  onChange: (value: Dayjs) => void;
};

const NativeInputContainer = memo(styled.input<{ valid: boolean }>`
  border: none;
  border-bottom: 1px solid #ccc;
  border-bottom: solid 2px ${({ theme }) => theme.palette.divider};

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &:focus {
    outline: none;
    border-bottom: solid 2px
      ${({ theme, valid }) =>
        valid ? theme.palette.primary : theme.palette.danger.main};
  }
`);

export const NativeInput = ({ date, onChange }: Props) => {
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
        onChange(dayjs(`${y}-${m}-${d}`));
      }
    },
    [onChange]
  );

  return (
    <NativeInputContainer
      type="date"
      valid={valid}
      value={`${selected.y}-${selected.m}-${selected.d}`}
      onChange={handleDateChange}
    />
  );
};
