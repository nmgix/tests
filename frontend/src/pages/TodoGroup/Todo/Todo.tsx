import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "./_todo.scss";
import { ITodo } from "../TodoList/TodoList";
import Box from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import ChooseIcon from "../../../helpers/ChooseIcon";
import Popup from "../../../components/Popup/Popup";

const Todo: React.FC = () => {
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

  const deleteFile = async (todoId: string) => {
    await axios.delete(`http://localhost:5000/todo/${todoId}`, { withCredentials: true }).catch((err) => {});
    navigate("/todo/list");
  };

  return (
    <div className='todoPage'>
      {!todo ? (
        <div className='spinLoader'>
          <img src='/gifs/spinner.gif' alt='анимация загрузки' />
          <span>загрузка...</span>
        </div>
      ) : (
        <div className='todo'>
          <Button onClick={() => navigate("/todo/list")}>
            <img src='/icons/arrowLeft.svg' alt='стрелка вернуться назад' />
            <span>Назад</span>
          </Button>
          <Box>
            <div>
              <div className='todoHeader'>
                <h4>{todo.title}</h4>

                <div className='todoHeaderControl'>
                  <div>
                    <input
                      type={"checkbox"}
                      checked={todo.completed}
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
                        <button onClick={() => navigate(`/todo/edit/${todo._id}`)}>редактировать</button>,
                        <button onClick={() => deleteFile(todo._id)} className='popupDanger'>
                          удалить
                        </button>,
                      ]}
                    />
                  </div>
                  <span style={{ color: dayjs(new Date()).isAfter(dayjs(todo.activeUntil)) ? "red" : "#000" }}>
                    до {dayjs(todo.activeUntil).format("DD.MM.YY")}
                  </span>
                </div>
              </div>
              {todo.description ? <p className='todoDescription'>{todo.description}</p> : <></>}
              {todo.attachments && todo.attachments.length > 0 ? (
                <ul className='todoAttachments'>
                  {todo.attachments.map((attachment) => (
                    <li onClick={() => fetchFile(attachment)}>
                      <Box>
                        <span>{`${attachment}`.slice(37)}</span>
                        <div>
                          <ChooseIcon name={`${attachment}`.split(".").pop()!} />
                        </div>
                      </Box>
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Todo;
