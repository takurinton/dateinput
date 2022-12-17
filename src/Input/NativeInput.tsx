import dayjs, { Dayjs } from "dayjs";
import {
  KeyboardEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { isValidDate } from "./utils";
import { Selected, Year, Month, Day } from "./types";
import { AllowedKeys } from "./constants";
import { Typography } from "ingred-ui";

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
      min="1900-01-01"
      max="2099-12-31"
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
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const handleStartDateChange = (newDate: Dayjs) => {
    onChange({ ...date, startDate: newDate });
  };
  const handleEndDateChange = (newDate: Dayjs) => {
    onChange({ ...date, endDate: newDate });
  };

  const handleStartKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const k = event.key as AllowedKeys;
    if (k === AllowedKeys.ArrowRight) {
      endRef.current?.focus();
    }
  };

  const handleEndKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const k = event.key as AllowedKeys;
    if (k === AllowedKeys.ArrowLeft) {
      // I want to focus on the date of the start date, but the focus is on the year
      // I don't know how to solve this...
      startRef.current?.focus();
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
        ref={startRef}
        type="date"
        min="1900-01-01"
        max="2099-12-31"
        valid={validStart}
        value={`${selectedStart.y}-${selectedStart.m}-${selectedStart.d}`}
        onKeyDown={handleStartKeyDown}
        onChange={handleStartChange}
      />
      <Typography component="span" color="gray">
        {" "}
        -{" "}
      </Typography>
      <NativeInputContainer
        ref={endRef}
        type="date"
        min="1900-01-01"
        max="2099-12-31"
        valid={validEnd}
        value={`${selectedEnd.y}-${selectedEnd.m}-${selectedEnd.d}`}
        onKeyDown={handleEndKeyDown}
        onChange={handleEndChange}
      />
    </>
  );
};
