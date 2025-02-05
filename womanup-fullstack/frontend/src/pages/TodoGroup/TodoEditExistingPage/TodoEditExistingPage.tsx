import TodoEdit from "../TodoEdit/TodoEdit";
import { useNavigate, useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { ITodo } from "../../../types/ITodo";
import { getTodo, updateTodo } from "../../../helpers/functions/todos";
// import { useAction } from "../../../store/helpers/useAppHooks";
// import { initAddNewPopup } from "../../../store/reducers/popupReducer";
import { AxiosResponse } from "axios";

const TodoEditExisting: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ todoId: string }>();
  const [todo, setTodo] = useState<ITodo>();
  // const { initUpdateTodo } = useAction();
  useLayoutEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodo(params.todoId!);
      if (!todo) {
        console.log("Задание не найдено");
        return navigate("/todo/list");
        // initAddNewPopup({ message: "Задание не найдено" });
      } else {
        setTodo(todo);
      }
    };
    try {
      fetchTodo();
    } catch (error) {
      // initAddNewPopup({ message: "Произошла ошибка при получении задания" });
      return navigate("/todo/list");
    }
  }, [navigate, params.todoId]);

  const onSubmit = async (formData: FormData) => {
    // initUpdateTodo(formData);
    await updateTodo(formData)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          return navigate(`todo/${params.todoId}`);
        } else {
          return navigate("/auth/login");
        }
      })
      .catch((err) => {
        return navigate("/auth/login");
      });
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
