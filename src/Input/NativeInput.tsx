import dayjs, { Dayjs } from "dayjs";
import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { isValidDate } from "./utils";
import { Selected, Year, Month, Day } from "./types";
import { AllowedKeys } from "./constants";

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
        valid ? theme.palette.primary.main : theme.palette.danger.main};
  }
`);

const useInput = (date: Dayjs, onChange?: (date: Dayjs) => void) => {
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

export const NativeInput = ({ date, onChange }: Props) => {
  const { selected, valid, handleDateChange } = useInput(date, onChange);
  return (
    <NativeInputContainer
      type="date"
      valid={valid}
      value={`${selected.y}-${selected.m}-${selected.d}`}
      onChange={handleDateChange}
    />
  );
};

export const NativeInputRange = ({
  date,
  onChange,
}: {
  date: {
    startDate: Dayjs;
    endDate: Dayjs;
  };
  onChange: (value: { startDate: Dayjs; endDate: Dayjs }) => void;
}) => {
  const handleStartDateChange = (newDate: Dayjs) => {
    onChange({ ...date, startDate: newDate });
  };
  const handleEndDateChange = (newDate: Dayjs) => {
    onChange({ ...date, endDate: newDate });
  };

  const handleStartKeyDown = (k: AllowedKeys) => {
    if (k === AllowedKeys.ArrowRight) {
      // TODO: focus change
    }
  };

  const handleEndKeyDown = (k: AllowedKeys) => {
    if (k === AllowedKeys.ArrowLeft) {
      // TODO: focus change
    }
  };

  const {
    selected: selectedStart,
    valid: validStart,
    handleDateChange: handleStartChange,
  } = useInput(date.startDate, handleStartDateChange);

  const {
    selected: selectedEnd,
    valid: validEnd,
    handleDateChange: handleEndChange,
  } = useInput(date.endDate, handleEndDateChange);

  return (
    <>
      <NativeInputContainer
        type="date"
        valid={validStart}
        value={`${selectedStart.y}-${selectedStart.m}-${selectedStart.d}`}
        onChange={handleStartChange}
      />
      <NativeInputContainer
        type="date"
        valid={validEnd}
        value={`${selectedEnd.y}-${selectedEnd.m}-${selectedEnd.d}`}
        onChange={handleEndChange}
      />
    </>
  );
};
