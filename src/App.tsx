import styled, { ThemeProvider } from "styled-components";
import DateBar from "./components/DateBar";
import { DateData } from "./components/DateBar/styles";
import Header from "./components/Header";
import AppContextProvider from "./Context";
import GlobalStyle from "./styles/global";

const AppWrapper = styled.div`
  width: 740px;
  height: 100%;
`;

function App() {
  return (
    <AppContextProvider>
      <AppWrapper>
        <ThemeProvider theme={{ mode: "default" }}>
          <GlobalStyle />
          <Header />
          <DateBar />
        </ThemeProvider>
      </AppWrapper>
    </AppContextProvider>
  );
}

export default App;
