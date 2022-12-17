import { Dayjs } from "dayjs";
import { Flex, Spacer, Typography } from "ingred-ui";
import { FC } from "react";
import { CommonInput } from "./CommonInput";
import { AllowedKeys } from "../constants";
import { useInput } from "./hooks";
import { Range } from "../types";

type Props = {
  date: Range;
  onChange: ({ startDate, endDate }: Range) => void;
};

export const InputRange: FC<Props> = ({ date, onChange }) => {
  const handleChangeStartDate = (newDate: Dayjs) => {
    onChange({ ...date, startDate: newDate });
  };

  const handleChangeEndDate = (newDate: Dayjs) => {
    onChange({ ...date, endDate: newDate });
  };

  const handleStartKeyDown = (k: AllowedKeys) => {
    if (k === AllowedKeys.ArrowRight) {
      endYearRef.current?.setSelectionRange(0, 0);
      setTimeout(() => {
        endYearRef.current?.focus();
      }, 0);
    }
  };

  const handleEndKeyDown = (k: AllowedKeys) => {
    if (k === AllowedKeys.ArrowLeft) {
      startDayRef.current?.setSelectionRange(
        startDayRef.current?.value.length,
        startDayRef.current?.value.length
      );
      setTimeout(() => {
        startDayRef.current?.focus();
      }, 0);
    }
  };

  const {
    ref: startRef,
    yearRef: startYearRef,
    monthRef: startMonthRef,
    dayRef: startDayRef,
    focus: startFocus,
    selected: startSelected,
    valid: startValid,
    handleChange: handleChangeStart,
    onFocus: onFocusStart,
    onBlur: onBlurStart,
    onKeyDown: onKeyDownStart,
  } = useInput(date.startDate, handleChangeStartDate, handleStartKeyDown);

  const {
    ref: endRef,
    yearRef: endYearRef,
    monthRef: endMonthRef,
    dayRef: endDayRef,
    focus: endFocus,
    selected: endSelected,
    valid: endValid,
    handleChange: handleChangeEnd,
    onFocus: onFocusEnd,
    onBlur: onBlurEnd,
    onKeyDown: onKeyDownEnd,
  } = useInput(date.endDate, handleChangeEndDate, handleEndKeyDown);

  return (
    <Flex display="flex">
      <CommonInput
        ref={startRef}
        date={date.startDate}
        focus={startFocus}
        valid={startValid}
        selected={startSelected}
        yearRef={startYearRef}
        monthRef={startMonthRef}
        dayRef={startDayRef}
        handleChange={handleChangeStart}
        onFocus={onFocusStart}
        onBlur={onBlurStart}
        onKeyDown={onKeyDownStart}
      />
      <Spacer pr={1} pl={1}>
        <Typography component="span" color="gray">
          -
        </Typography>
      </Spacer>
      <CommonInput
        ref={endRef}
        date={date.endDate}
        focus={endFocus}
        valid={endValid}
        selected={endSelected}
        yearRef={endYearRef}
        monthRef={endMonthRef}
        dayRef={endDayRef}
        handleChange={handleChangeEnd}
        onFocus={onFocusEnd}
        onBlur={onBlurEnd}
        onKeyDown={onKeyDownEnd}
      />
    </Flex>
  );
};
