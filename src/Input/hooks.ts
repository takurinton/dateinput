import dayjs, { Dayjs } from "dayjs";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Day, Month, Selected, Year, YMD } from "./types";
import { isValidDate, transformSelected } from "./utils";
import { AllowedKeys, allowedKeys } from "./constants";

export const useInput = (
  date: Dayjs,
  onChange?: (date: Dayjs) => void,
  handleKeyDown?: (k: AllowedKeys) => void
) => {
  const ref = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  const [selected, setSelected] = useState<Selected>({
    y: date.format("YYYY") as Year,
    m: date.format("MM") as Month,
    d: date.format("DD") as Day,
  });
  const valid = useMemo(() => isValidDate(selected), [selected]);

  const handleChange = useCallback(
    (type: YMD) => (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange === undefined) {
        return;
      }

      const { value } = event.target;
      const newValue = transformSelected(selected, type, value);
      setSelected(newValue);
      if (valid) {
        onChange &&
          onChange(dayjs(`${newValue.y}-${newValue.m}-${newValue.d}`));
      }
    },
    []
  );

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const onKeyDown = useCallback(
    (focusType: YMD) => (event: KeyboardEvent<HTMLInputElement>) => {
      const k: AllowedKeys = event.key as AllowedKeys;

      if (
        focusType === null ||
        event.target === null ||
        !allowedKeys.includes(k)
      ) {
        event.preventDefault();
        return;
      }

      // allow up/down event, increment/decrement
      if (k === AllowedKeys.ArrowUp) {
        event.preventDefault();
        const newValue = transformSelected(
          selected,
          focusType,
          String(Number(selected[focusType]) + 1)
        );
        setSelected(newValue);
        if (valid) {
          onChange &&
            onChange(dayjs(`${newValue.y}-${newValue.m}-${newValue.d}`));
        }
      }
      if (k === AllowedKeys.ArrowDown) {
        event.preventDefault();
        const newValue = transformSelected(
          selected,
          focusType,
          String(Number(selected[focusType]) - 1)
        );
        setSelected(newValue);
        if (valid) {
          onChange &&
            onChange(dayjs(`${newValue.y}-${newValue.m}-${newValue.d}`));
        }
      }

      // allow left/right event, change focus
      // MEMO: setSelectionRange delay, so use setTimeout
      // @ts-ignore
      const position = event.target.selectionStart;
      if (k === AllowedKeys.ArrowLeft || k === AllowedKeys.Slash) {
        switch (focusType) {
          case "y":
            // for range input
            if (handleKeyDown && position === 0) {
              handleKeyDown(k);
            }
            break;
          case "m":
            if (position === 0) {
              if (yearRef.current !== null) {
                yearRef.current.setSelectionRange(
                  yearRef.current.value.length,
                  yearRef.current.value.length
                );
                setTimeout(() => {
                  yearRef.current?.focus();
                }, 0);
              }
            }
            break;
          case "d":
            if (position === 0) {
              if (monthRef.current !== null) {
                monthRef.current.setSelectionRange(
                  monthRef.current.value.length,
                  monthRef.current.value.length
                );
                setTimeout(() => {
                  monthRef.current?.focus();
                }, 0);
              }
            }
            break;
        }
      }

      if (k === AllowedKeys.ArrowRight || k === AllowedKeys.Slash) {
        switch (focusType) {
          case "y":
            if (position === yearRef.current?.value.length) {
              if (monthRef.current !== null) {
                monthRef.current.setSelectionRange(0, 0);
                setTimeout(() => {
                  monthRef.current?.focus();
                }, 0);
              }
            }
            break;
          case "m":
            if (position === monthRef.current?.value.length) {
              if (dayRef.current !== null) {
                dayRef.current.setSelectionRange(0, 0);
                setTimeout(() => {
                  dayRef.current?.focus();
                }, 0);
              }
            }
            break;
          case "d":
            // for range input
            if (handleKeyDown && position === dayRef.current?.value.length) {
              handleKeyDown(k);
            }
            break;
        }
      }
    },
    [selected]
  );

  return {
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
  };
};
