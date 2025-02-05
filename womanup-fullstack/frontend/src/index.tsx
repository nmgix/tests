import ReactDOM from "react-dom/client";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store/store";
import "./index.scss";

import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import TodoList from "./pages/TodoGroup/TodoList/TodoList";
import Auth from "./pages/Auth/Auth";
import Popups from "./components/Popups/Popups";
import TodoWrapper from "./pages/TodoGroup/TodoWrapper/TodoWrapper";
import TodoCreate from "./pages/TodoGroup/TodoCreate/TodoCreate";
import Todo from "./pages/TodoGroup/Todo/Todo";
import TodoEditExisting from "./pages/TodoGroup/TodoEditExistingPage/TodoEditExistingPage";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
    {/* <> */}
    <Routes>
      <Route path='/todo' element={<TodoWrapper />}>
        <Route path='list' element={<TodoList />} index />
        <Route path='edit/:todoId' element={<TodoEditExisting />} />
        <Route path='create' element={<TodoCreate />} />
        <Route path=':todoId' element={<Todo />} />
      </Route>
      <Route path='/auth' element={<Auth />}>
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
      </Route>
      <Route path='*' element={<Navigate to='/todo/list' replace />} />
    </Routes>
    {/* <Popups /> */}
    {/* </> */}
    {/* </Provider> */}
  </BrowserRouter>
);
