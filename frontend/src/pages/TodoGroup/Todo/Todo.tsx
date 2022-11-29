import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import "./_todo.scss";
import Box from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import ChooseIcon from "../../../helpers/ChooseIcon";
import Popup from "../../../components/Popup/Popup";
import { ITodo } from "../../../types/ITodo";
import { fetchFile, getTodo } from "../../../helpers/functions/todos";
// import { useAction, useAppSelector } from "../../../store/helpers/useAppHooks";

const Todo: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ todoId: string }>();
  // const { currentTodo } = useAppSelector((state) => state.todoControl);
  // const { initFetchTodo } = useAction();
  const [currentTodo, setCurrentTodo] = useState<ITodo>();

  const fetchTodo = useCallback(async () => {
    const todo = await getTodo(params.todoId!);
    if (!todo) {
      navigate("/todo/list");
    } else {
      setCurrentTodo(todo);
    }
  }, [navigate, params.todoId]);

  useEffect(() => {
    if (!params.todoId || params.todoId.length === 0) {
      navigate("/todo/list");
    } else {
      fetchTodo();
    }
  }, [navigate, params.todoId, fetchTodo]);

  const fetchFileLocal = async (attachment: string) => {
    await fetchFile(attachment).catch((err) => navigate("/auth/login"));
  };

  const deleteFile = async (todoId: string) => {
    await axios.delete(`${process.env.SERVER_ADDRESS}/todo/${todoId}`, { withCredentials: true }).catch((err) => {});
    navigate("/todo/list");
  };

  const changeCompletionStatus = async (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    const formData = new FormData();
    formData.append("_id", todoId);
    formData.append("completed", String(e.target.checked));
    await axios.patch(`${process.env.SERVER_ADDRESS}/todo`, formData, { withCredentials: true });
    fetchTodo();
  };

  return (
    <div className='todoPage'>
      {!currentTodo ? (
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
                <h4>{currentTodo.title}</h4>

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
                        <button onClick={() => deleteFile(currentTodo._id)} className='popupDanger'>
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
                <ul className='todoAttachments'>
                  {currentTodo.attachments.map((attachment) => (
                    <li onClick={() => fetchFileLocal(attachment)} key={attachment}>
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
