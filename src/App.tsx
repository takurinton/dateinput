import dayjs from "dayjs";
import { createTheme, Spacer, ThemeProvider, Typography } from "ingred-ui";
import { useState } from "react";
import { Input, InputRange } from "./Input";
import { NativeInput } from "./Input/NativeInput";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState(dayjs());
  const [nativeInputDate, setNativeInputDate] = useState(dayjs());
  const [dateRange, setDateRange] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(1, "week"),
  });

  return (
    <ThemeProvider theme={theme}>
      <Typography weight="bold">
        selected: {date.format("YYYY-MM-DD")}
      </Typography>
      <Input date={date} onChange={setDate} />
      <Spacer pt={4} />
      <Typography weight="bold">
        selected: {nativeInputDate.format("YYYY-MM-DD")}
      </Typography>
      <NativeInput date={nativeInputDate} onChange={setNativeInputDate} />
      <Spacer pt={4} />
      <Typography weight="bold">
        selected: {dateRange.startDate.format("YYYY-MM-DD")} -{" "}
        {dateRange.endDate.format("YYYY-MM-DD")}
      </Typography>
      <InputRange date={dateRange} onChange={setDateRange} />
    </ThemeProvider>
  );
}

export default App;
