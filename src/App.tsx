import dayjs from "dayjs";
import { createTheme, Spacer, ThemeProvider, Typography } from "ingred-ui";
import { useState } from "react";
import { Input, InputRange } from "./Input";
import { NativeInput, NativeInputRange } from "./Native";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState(dayjs());
  const [nativeInputDate, setNativeInputDate] = useState(dayjs());
  const [dateRange, setDateRange] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(1, "week"),
  });
  const [nativeDateRange, setNativeDateRange] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(1, "week"),
  });

  return (
    <ThemeProvider theme={theme}>
      <Typography weight="bold">
        selected(myself input): {date.format("YYYY-MM-DD")}
      </Typography>
      <Input date={date} onChange={setDate} />
      <Spacer pt={4} />
      <Typography weight="bold">
        selected(native input): {nativeInputDate.format("YYYY-MM-DD")}
      </Typography>
      <NativeInput date={nativeInputDate} onChange={setNativeInputDate} />
      <Spacer pt={4} />
      <Typography weight="bold">
        selected(myself input range): {dateRange.startDate.format("YYYY-MM-DD")}{" "}
        - {dateRange.endDate.format("YYYY-MM-DD")}
      </Typography>
      <InputRange date={dateRange} onChange={setDateRange} />
      <Typography weight="bold">
        selected(native input range):{" "}
        {nativeDateRange.startDate.format("YYYY-MM-DD")} -{" "}
        {nativeDateRange.endDate.format("YYYY-MM-DD")}
      </Typography>
      <NativeInputRange date={dateRange} onChange={setNativeDateRange} />
    </ThemeProvider>
  );
}

export default App;
