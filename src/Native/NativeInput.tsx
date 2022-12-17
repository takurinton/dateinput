import { Dayjs } from "dayjs";
import { NativeInputContainer } from "./styled";
import { useInput } from "./hooks";

type Props = {
  date: Dayjs;
  onChange: (value: Dayjs) => void;
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
