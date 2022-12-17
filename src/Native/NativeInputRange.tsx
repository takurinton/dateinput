import { Dayjs } from "dayjs";
import { Typography } from "ingred-ui";
import { KeyboardEvent, useCallback, useRef } from "react";
import { AllowedKeys } from "../constants";
import { useInput } from "./hooks";
import { NativeInputContainer } from "./styled";

type Props = {
  date: {
    startDate: Dayjs;
    endDate: Dayjs;
  };
  onChange: (value: { startDate: Dayjs; endDate: Dayjs }) => void;
};

export const NativeInputRange = ({ date, onChange }: Props) => {
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const handleStartDateChange = (newDate: Dayjs) => {
    onChange({ ...date, startDate: newDate });
  };
  const handleEndDateChange = (newDate: Dayjs) => {
    onChange({ ...date, endDate: newDate });
  };

  const handleStartKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const k = event.key as AllowedKeys;
      if (k === AllowedKeys.ArrowRight) {
        endRef.current?.focus();
      }
    },
    []
  );

  const handleEndKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const k = event.key as AllowedKeys;
      if (k === AllowedKeys.ArrowLeft) {
        // I want to focus on the date of the start date, but the focus is on the year
        // I don't know how to solve this...
        startRef.current?.focus();
      }
    },
    []
  );

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
