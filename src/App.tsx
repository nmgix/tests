import styled, { ThemeProvider } from "styled-components";
import DateBar from "./components/DateBar";
import { DateData } from "./components/DateBar/styles";
import Header from "./components/Header";
import GlobalStyle from "./styles/global";

const AppWrapper = styled.div`
  width: 740px;
  height: 100%;
`;

const mockData: DateData = {
  dayProps: {
    prevWeek: [
      {
        selected: false,
        weekDay: "M",
        weekDayNumber: 2,
      },
      {
        selected: false,
        weekDay: "T",
        weekDayNumber: 3,
      },
      {
        selected: false,
        weekDay: "W",
        weekDayNumber: 4,
      },
      {
        selected: false,
        weekDay: "T",
        weekDayNumber: 5,
      },
      {
        selected: false,
        weekDay: "F",
        weekDayNumber: 6,
      },
      {
        selected: false,
        weekDay: "S",
        weekDayNumber: 7,
      },
      {
        selected: false,
        weekDay: "S",
        weekDayNumber: 8,
      },
    ],
    currentWeek: [
      {
        selected: false,
        weekDay: "M",
        weekDayNumber: 9,
      },
      {
        selected: true,
        weekDay: "T",
        weekDayNumber: 10,
      },
      {
        selected: false,
        weekDay: "W",
        weekDayNumber: 11,
      },
      {
        selected: false,
        weekDay: "T",
        weekDayNumber: 12,
      },
      {
        selected: false,
        weekDay: "F",
        weekDayNumber: 13,
      },
      {
        selected: false,
        weekDay: "S",
        weekDayNumber: 14,
      },
      {
        selected: false,
        weekDay: "S",
        weekDayNumber: 15,
      },
    ],
    nextWeek: [
      {
        selected: false,
        weekDay: "M",
        weekDayNumber: 16,
      },
      {
        selected: false,
        weekDay: "T",
        weekDayNumber: 17,
      },
      {
        selected: false,
        weekDay: "W",
        weekDayNumber: 18,
      },
      {
        selected: false,
        weekDay: "T",
        weekDayNumber: 19,
      },
      {
        selected: false,
        weekDay: "F",
        weekDayNumber: 20,
      },
      {
        selected: false,
        weekDay: "S",
        weekDayNumber: 21,
      },
      {
        selected: false,
        weekDay: "S",
        weekDayNumber: 22,
      },
    ],
  },
  monthProps: {
    month: "March",
    year: 2022,
  },
};

function App() {
  return (
    <AppWrapper>
      <ThemeProvider theme={{ mode: "default" }}>
        <GlobalStyle />
        <Header />
        <DateBar dayProps={mockData.dayProps} monthProps={mockData.monthProps} />
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
