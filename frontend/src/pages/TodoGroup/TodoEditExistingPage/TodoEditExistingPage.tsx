import TodoEdit from "../TodoEdit/TodoEdit";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ITodo } from "../TodoList/TodoList";
import { useLayoutEffect, useState } from "react";

const TodoEditExisting: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ todoId: string }>();
  const [todo, setTodo] = useState<ITodo>();

  useLayoutEffect(() => {
    const fetchTodo = async () => {
      await axios
        .get<{}, { data: ITodo }>(`http://localhost:5000/todo/${params.todoId}`, { withCredentials: true })
        .then((res) => setTodo(res.data))
        .catch((err) => {
          return navigate("/todo/list");
        });
    };
    fetchTodo();
  }, [navigate, params.todoId]);

  const onSubmit = async (formData: FormData) => {
    // const res =
    await axios
      .patch("http://localhost:5000/todo/", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((err) => {});
    navigate(`/todo/${todo!._id}`);
  };

  return !todo ? (
    <div>загрузка</div>
  ) : (
    <TodoEdit
      header='Изменение существующего задания'
      onSubmit={onSubmit}
      existingTodo={todo}
      submitText={"Обновить"}
    />
  );
};

export default TodoEditExisting;
