import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter, Outlet, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";

import { HomePage } from "./pages/Homepage/HomePage";
import { LoginPage } from "./pages/Loginpage/LoginPage";
import { Page404 } from "./pages/Page404";
import { ProtectedPage } from "./pages/Protectedpage/ProtectedPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/_main.scss";

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route
              path='home'
              element={
                <ProtectedPage redirectTo={"/"}>
                  <Outlet />
                </ProtectedPage>
              }>
              <Route index element={<HomePage />} />
            </Route>
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
