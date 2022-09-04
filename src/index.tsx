import ReactDOM from "react-dom/client";
import "./index.css";
import styled from "styled-components";
import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserPage } from "./pages/User";
import { RedirectPage } from "./pages/Redirect";

const App = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <App>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/:key' element={<RedirectPage />} />
      </Routes>
    </BrowserRouter>
  </App>
);
