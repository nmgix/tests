import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Button from "../../../components/Button/Button";
import Box from "../../../components/Box/Box";
import dayjs from "dayjs";
import ChooseIcon from "../../../helpers/ChooseIcon";
import { Link } from "react-router-dom";
import "../Todo/_todo.scss";
import "./_todoList.scss";
import Popup from "../../../components/Popup/Popup";

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  activeUntil: string;
  attachments: string[];
}

const TodoList: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>();

  const fetchTodos = async () => {
    await axios
      .get("http://localhost:5000/todo/", {
        params: {
          from: 0,
          to: 10,
        },
        withCredentials: true,
      })
      .then((res) => setTodos(res.data))
      .catch((err) => {
        console.log(err);
        return navigate("/auth/login");
      });
  };

  useLayoutEffect(() => {
    fetchTodos();
  }, [navigate]);

  const fetchFile = async (attachmentName: string) => {
    await axios
      .get(`http://localhost:5000/static/${attachmentName}`, {
        withCredentials: true,
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${attachmentName}`.slice(37));
        document.body.appendChild(link);
        link.click();

        link.parentNode!.removeChild(link);
      })
      .catch((err) => navigate("/auth/login"));
  };

  const deleteFile = async (todo: ITodo) => {
    await axios.delete(`http://localhost:5000/todo/${todo._id}`, { withCredentials: true }).catch((err) => {});
    fetchTodos();
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
                        onChange={() => console.log("updaing current todo at backend")}
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
                    <div onClick={() => fetchFile(currentTodo.attachments[0])}>
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
