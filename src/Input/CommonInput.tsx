import { Dayjs } from "dayjs";
import { Typography } from "ingred-ui";
import { ChangeEvent, forwardRef, KeyboardEvent, memo, RefObject } from "react";
import { InputContainer, InputElement } from "./styled";
import { Selected, YMD } from "../types";

type Props = {
  date: Dayjs;
  focus: boolean;
  valid: boolean;
  selected: Selected;
  yearRef: RefObject<HTMLInputElement>;
  monthRef: RefObject<HTMLInputElement>;
  dayRef: RefObject<HTMLInputElement>;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (type: YMD) => (event: KeyboardEvent<HTMLInputElement>) => void; // for developer
  handleChange: (type: YMD) => (event: ChangeEvent<HTMLInputElement>) => void; // for user
};

const Input = forwardRef<HTMLDivElement, Props>(
  (
    {
      focus,
      valid,
      selected,
      yearRef,
      monthRef,
      dayRef,
      onFocus,
      onBlur,
      onKeyDown,
      handleChange,
    },
    ref
  ) => (
    <InputContainer ref={ref} focus={focus} valid={valid}>
      <InputElement
        placeholder="yyyy"
        ref={yearRef}
        count={4}
        value={selected.y}
        maxLength={4}
        pattern="[0-9]*"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange("y")}
        onKeyDown={onKeyDown("y")}
      />
      <Typography component="span" color="gray">
        /
      </Typography>
      <InputElement
        placeholder="mm"
        ref={monthRef}
        count={2}
        value={selected.m}
        maxLength={2}
        pattern="[0-9]*"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange("m")}
        onKeyDown={onKeyDown("m")}
      />
      <Typography component="span" color="gray">
        /
      </Typography>
      <InputElement
        placeholder="dd"
        ref={dayRef}
        count={2}
        value={selected.d}
        maxLength={2}
        pattern="[0-9]*"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleChange("d")}
        onKeyDown={onKeyDown("d")}
      />
    </InputContainer>
  )
);

export const CommonInput = memo(Input);
