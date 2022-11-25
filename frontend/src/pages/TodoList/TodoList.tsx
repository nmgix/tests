import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Box from "../../components/Box/Box";
import dayjs from "dayjs";
import ChooseIcon from "../../helpers/ChooseIcon";
import "./_todoList.scss";

interface ITodo {
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

  useEffect(() => {
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

  return (
    <div className='todoListPage'>
      <ul className='todoListWrapper'>
        {todos && todos.length > 0 ? (
          todos.map((currentTodo) => (
            <div className='todoList' key={currentTodo._id}>
              <Box>
                <div className='todoListHeader'>
                  <h4>{currentTodo.title}</h4>
                  <div className='todoListHeaderControl'>
                    <div>
                      <input
                        type={"checkbox"}
                        checked={currentTodo.completed}
                        onChange={() => console.log("updaing current todo at backend")}
                      />
                      <ul onClick={() => console.log("invoking popup")}>
                        <li />
                        <li />
                        <li />
                      </ul>
                    </div>
                    <span style={{ color: dayjs(new Date()).isAfter(dayjs(currentTodo.activeUntil)) ? "red" : "#000" }}>
                      до {dayjs(currentTodo.activeUntil).format("DD.MM.YY")}
                    </span>
                  </div>
                </div>
                {currentTodo.description ? <p className='todoListDescription'>{currentTodo.description}</p> : <></>}
                {currentTodo.attachments && currentTodo.attachments.length > 0 ? (
                  <div className='todoListAttachments'>
                    <div onClick={() => fetchFile(currentTodo.attachments[0])}>
                      <Box>
                        <span>{`${currentTodo.attachments[0]}`.slice(37)}</span>
                        <div>
                          <ChooseIcon extension={`${currentTodo.attachments[0]}`.split(".").pop()!} />
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
          ))
        ) : (
          <div>
            <span>Задания отсутствуют</span>
            <Button>Создать новое</Button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
