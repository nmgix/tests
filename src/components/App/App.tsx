import { ThemeProvider } from "styled-components";
import DateBar from "../DateBarGroup/DateBar";
import Header from "../Header";
import AppContextProvider from "../../context/Context";
import GlobalStyle from "../../styles/global";
import { AppWrapper } from "./styles";

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
