import { ThemeProvider } from "styled-components";
import DateBar from "../DateBarGroup/DateBarComponent";
import AppContextProvider from "../../context/Context";
import GlobalStyle from "../../styles/global";
import { AppWrapper } from "./styles";
import Footer from "../FooterComponent";
import Header from "../HeaderComponent";
import Grid from "../EventsGroup/GridComponent";

function App() {
  return (
    <AppContextProvider>
      <AppWrapper>
        <ThemeProvider theme={{ mode: "default" }}>
          <GlobalStyle />
          <Header />
          <DateBar />
          <Grid />
          <Footer />
        </ThemeProvider>
      </AppWrapper>
    </AppContextProvider>
  );
}

export default App;
