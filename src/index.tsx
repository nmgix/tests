import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";

import { HomePage } from "./pages/Homepage/HomePage";
import { LoginPage } from "./pages/Loginpage/LoginPage";
import { Page404 } from "./pages/Page404";
import { ProtectedPage } from "./pages/Protectedpage/ProtectedPage";

import { Toast } from "./components/Toast";

import "bootstrap/dist/css/bootstrap.css";
import "./styles/_main.scss";

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className='App'>
          <Toast />
          <Routes>
            <Route index element={<LoginPage />} />
            <Route
              path='home'
              element={
                <ProtectedPage redirectTo='/'>
                  <HomePage />
                </ProtectedPage>
              }
            />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
