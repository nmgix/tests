import TodoEdit from "../TodoEdit/TodoEdit";
import { useNavigate } from "react-router";
import { createTodo } from "../../../helpers/functions/todos";
// import { useAction } from "../../../store/helpers/useAppHooks";
import { AxiosResponse } from "axios";

const TodoCreate: React.FC = () => {
  const navigate = useNavigate();
  // const { initCreateTodo } = useAction();

  const onSubmit = async (formData: FormData) => {
    // initCreateTodo(formData);
    await createTodo(formData)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          return navigate("/todo/list");
        } else {
          return navigate("/auth/login");
        }
      })
      .catch((err) => {
        return navigate("/auth/login");
      });
  };

  return <TodoEdit header='Создание нового задания' onSubmit={onSubmit} submitText={"Создать"} />;
};

export default TodoCreate;
