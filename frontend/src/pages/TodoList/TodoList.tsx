import { Outlet } from "react-router-dom";

const TodoList: React.FC = () => {
  return (
    <div>
      <span>todo list</span>
      <Outlet />
    </div>
  );
};

export default TodoList;
