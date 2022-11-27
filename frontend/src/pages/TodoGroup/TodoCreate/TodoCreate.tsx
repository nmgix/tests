import TodoEdit from "../TodoEdit/TodoEdit";
import axios from "axios";
import { useNavigate } from "react-router";

const TodoCreate: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    const res = await axios
      .post("http://localhost:5000/todo/", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {});
    navigate("/todo/list");
  };

  return <TodoEdit header='Создание нового задания' onSubmit={onSubmit} />;
};

export default TodoCreate;
