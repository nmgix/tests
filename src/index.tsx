import ReactDOM from "react-dom/client";
import "./index.css";
import styled from "styled-components";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";

const App = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <App>
    {/* <LoginPage /> */}
    <RegistrationPage />
  </App>
);
