import styled, { ThemeProvider } from "styled-components";
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
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
