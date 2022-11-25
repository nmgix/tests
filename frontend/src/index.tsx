import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Todo from "./pages/Todo/Todo";
import TodoList from "./pages/TodoList/TodoList";
import "./index.scss";
import Auth from "./pages/Auth/Auth";
import Notifications from "./components/Notifications/Notifications";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <>
      <Routes>
        <Route path='/list' element={<TodoList />} />
        <Route path='/list/:todoId' element={<Todo />} />
        <Route path='/auth' element={<Auth />}>
          <Route path='login' element={<Login />} />
          <Route path='registration' element={<Registration />} />
        </Route>
        <Route path='*' element={<Navigate to='/list' replace />} />
      </Routes>
      <Notifications />
    </>
  </BrowserRouter>
);
