# Date input

Flexible `<input />` component prototype with validation.
It is mainly designed to use in [ingred-ui](https://github.com/voyagegroup/ingred-ui) as a component.
Intended to be used in conjunction with [calendar](https://github.com/takurinton/calendar).

## TODO

- [ ] localization
- [ ] internationalization
- [ ] user defined custom validation with zod, yup, and more
- [ ] Add another design(need another look that behaves the same)

## Usage

Note that components have no state inside them.  
You have to setState on your side.

### single

```tsx
import dayjs from "dayjs";
import { createTheme, ThemeProvider, Typography } from "ingred-ui";
import { useState } from "react";
// import { Input } from "ingred-ui";
import { Input } from "./Input";

function App() {
  const theme = createTheme();
  const [date, setDate] = useState(dayjs());

  return (
    <ThemeProvider theme={theme}>
      <Typography weight="bold">
        selected: {date.format("YYYY-MM-DD")}
      </Typography>
      <Input date={date} onChange={setDate} />
    </ThemeProvider>
  );
}

export default App;
```

### range

```tsx
import dayjs from "dayjs";
import { createTheme, ThemeProvider, Typography } from "ingred-ui";
import { useState } from "react";
// import { InputRange } from "ingred-ui";
import { InputRange } from "./Input";

function App() {
  const theme = createTheme();
  const [dateRange, setDateRange] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(1, "week"),
  });

  return (
    <ThemeProvider theme={theme}>
      <Typography weight="bold">
        selected: {dateRange.startDate.format("YYYY-MM-DD")} -
        {dateRange.endDate.format("YYYY-MM-DD")}
      </Typography>
      <InputRange date={dateRange} onChange={setDateRange} />
    </ThemeProvider>
  );
}

export default App;
```
