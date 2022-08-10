import styled, { ThemeProvider } from "styled-components";
import DateBar from "./components/DateBar";
import Header from "./components/Header";
import GlobalStyle from "./styles/global";

const AppWrapper = styled.div`
  width: 740px;
  height: 100%;
`;

function App() {
  return (
    <AppWrapper>
      <ThemeProvider theme={{ mode: "default" }}>
        <GlobalStyle />
        <Header />
        <DateBar />
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
