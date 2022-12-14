import { Dayjs } from "dayjs";
import { FC } from "react";
import { useInput } from "./hooks";
import { CommonInput } from "./CommonInput";

type Props = {
  date: Dayjs;
  onChange?: (date: Dayjs) => void;
};

export const Input: FC<Props> = ({ date, onChange }) => {
  const {
    ref,
    yearRef,
    monthRef,
    dayRef,
    focus,
    selected,
    valid,
    handleChange,
    onFocus,
    onBlur,
    onKeyDown,
  } = useInput(date, onChange);

  return (
    <CommonInput
      ref={ref}
      date={date}
      focus={focus}
      valid={valid}
      selected={selected}
      yearRef={yearRef}
      monthRef={monthRef}
      dayRef={dayRef}
      handleChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};
