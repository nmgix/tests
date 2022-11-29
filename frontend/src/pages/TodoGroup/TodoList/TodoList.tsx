import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Button from "../../../components/Button/Button";
import Box from "../../../components/Box/Box";
import dayjs from "dayjs";
import ChooseIcon from "../../../helpers/ChooseIcon";
import Popup from "../../../components/Popup/Popup";
import { Link } from "react-router-dom";
import { ITodo } from "../../../types/ITodo";
import { fetchFile, getTodos } from "../../../helpers/functions/todos";
import "../Todo/_todo.scss";
import "./_todoList.scss";
// import { useAction, useAppSelector } from "../../../store/helpers/useAppHooks";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const navigate = useNavigate();
  // const { todos } = useAppSelector((state) => state.todoControl);
  // const { initAddToTodoList, fetchExistingFile } = useAction();
  const fetchTodos = useCallback(async (from: number, to: number) => {
    const newTodos = await getTodos(from, to);

    setTodos((prevTodos) => {
      // let existingTodosIds = new Set(prevTodos.map((t) => t._id));
      // let mergedTodos = [...prevTodos, ...newTodos.filter((t) => !existingTodosIds.has(t._id))];
      if (prevTodos.length === 0 && newTodos.length > prevTodos.length) {
        return newTodos;
      } else {
        if (newTodos.length < prevTodos.length) {
          return newTodos;
        } else {
          const mergedTodos = prevTodos.map((obj) => newTodos.find((o) => o._id === obj._id) || obj);
          return mergedTodos;
        }
      }
    });
  }, []);

  // copy-paste from Todo.tsx
  const fetchFileLocal = async (attachment: string) => {
    await fetchFile(attachment).catch((err) => navigate("/auth/login"));
  };

  useEffect(() => {
    // initAddToTodoList({ from: 0, to: 10 });
    fetchTodos(0, 10);
  }, [fetchTodos]);

  const deleteFile = async (todo: ITodo) => {
    await axios.delete(`${process.env.SERVER_ADDRESS}/todo/${todo._id}`, { withCredentials: true }).catch((err) => {});
    fetchTodos(0, 10);
  };

  const changeCompletionStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    const formData = new FormData();
    formData.append("_id", todoId);
    formData.append("completed", String(e.target.checked));
    await axios.patch(`${process.env.SERVER_ADDRESS}/todo`, formData, { withCredentials: true });
    fetchTodos(0, 10);
  };

  return (
    <div className='todoListPage'>
      {todos && todos.length > 0 && <Button onClick={() => navigate("/todo/create")}>Создать новое задание</Button>}
      {!todos ? (
        <div className='spinLoader'>
          <img src='/gifs/spinner.gif' alt='анимация загрузки' />
          <span>загрузка...</span>
        </div>
      ) : todos.length > 0 ? (
        <ul className='todoListWrapper'>
          {todos.map((currentTodo) => (
            <div className='todo' key={currentTodo._id}>
              <Box>
                <div className='todoHeader'>
                  <Link to={`/todo/${currentTodo._id}`}>
                    <h4>{currentTodo.title}</h4>
                  </Link>
                  <div className='todoHeaderControl'>
                    <div>
                      <input
                        type={"checkbox"}
                        checked={currentTodo.completed}
                        onChange={(e) => changeCompletionStatus(e, currentTodo._id)}
                      />
                      <Popup
                        controlButton={
                          <ul>
                            <li />
                            <li />
                            <li />
                          </ul>
                        }
                        buttons={[
                          <button onClick={() => navigate(`/todo/edit/${currentTodo._id}`)}>редактировать</button>,
                          <button onClick={() => deleteFile(currentTodo)} className='popupDanger'>
                            удалить
                          </button>,
                        ]}
                      />
                    </div>
                    <span style={{ color: dayjs(new Date()).isAfter(dayjs(currentTodo.activeUntil)) ? "red" : "#000" }}>
                      до {dayjs(currentTodo.activeUntil).format("DD.MM.YY")}
                    </span>
                  </div>
                </div>
                {currentTodo.description ? <p className='todoDescription'>{currentTodo.description}</p> : <></>}
                {currentTodo.attachments && currentTodo.attachments.length > 0 ? (
                  <div className='todoAttachments'>
                    <div onClick={() => fetchFileLocal(currentTodo.attachments[0])}>
                      <Box>
                        <span>{`${currentTodo.attachments[0]}`.slice(37)}</span>
                        <div>
                          <ChooseIcon name={`${currentTodo.attachments[0]}`.split(".").pop()!} />
                          {currentTodo.attachments.length > 1 ? (
                            <span>+{currentTodo.attachments.length - 1}</span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Box>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Box>
            </div>
          ))}
        </ul>
      ) : (
        <div className='todoListNonExisting'>
          <span>Задания отсутствуют</span>
          <Button onClick={() => navigate("/todo/create")}>Создать новое</Button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
