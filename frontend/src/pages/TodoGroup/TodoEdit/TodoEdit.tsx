import { useState } from "react";
import { useNavigate } from "react-router";
import Box from "../../../components/Box/Box";
import Button from "../../../components/Button/Button";
import ChooseIcon from "../../../helpers/ChooseIcon";
import { ITodo } from "../TodoList/TodoList";
import "./_todoEdit.scss";
import TextInput from "../../../components/TextInput/TextInput";

type TodoEditProps = {
  header: string;
  submitText: string;
  onSubmit: (formData: FormData) => any;
  existingTodo?: ITodo;
};

const TodoEdit: React.FC<TodoEditProps> = ({ header, onSubmit, existingTodo, submitText }) => {
  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date: Date | string) {
    date = new Date(date);
    return (
      [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join("-") +
      " " +
      [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(":")
    );
  }

  const updateTodo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTodo(
      (prevTodo) =>
        ({
          ...prevTodo,
          [e.target.name]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value,
        } as { [K in keyof ITodo]: ITodo[K] })
    );
  };
  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      return;
    }

    setFilesList((prevData) => {
      const dt = new DataTransfer();
      for (let i = 0; i < prevData.length; i++) {
        const file = prevData[i];
        dt.items.add(file);
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        dt.items.add(file);
      }
      return dt.files;
    });
  };
  const deleteFile = (name: string) => {
    // я бы мог добавить проверку по подполю которое создастся при загрузке файла,
    // при удалении ябы как раз проверял одинаковую дату, например, но не буду ибо эта часть и так занимает очень много времени
    if (todo.attachments.includes(name)) {
      setTodo((prevTodo) => ({
        ...prevTodo,
        attachments: prevTodo.attachments.filter((attachName) => attachName !== name),
      }));
    } else {
      setFilesList((prevData) => {
        const dt = new DataTransfer();
        for (let i = 0; i < prevData.length; i++) {
          const file = prevData[i];
          if (file.name !== name) {
            dt.items.add(file);
          }
        }
        return dt.files;
      });
    }
  };

  const onSubmitHandler = () => {
    const resultFormData = new FormData();

    Object.keys(todo).forEach((key) => {
      if (key === "attachments") {
        const existingFiles = todo["attachments"];
        existingFiles.forEach((file) => {
          resultFormData.append(`attachments`, file);
        });
      } else {
        resultFormData.append(key, todo[key as keyof ITodo] as string);
      }
    });

    for (let i = 0; i < filesList.length; i++) {
      resultFormData.append(`attachments`, filesList[i]);
    }

    return onSubmit(resultFormData);
  };

  const navigate = useNavigate();
  const [filesList, setFilesList] = useState<FileList>(new DataTransfer().files);
  const [todo, setTodo] = useState<ITodo>(
    existingTodo !== undefined
      ? {
          ...existingTodo,
          activeUntil: formatDate(existingTodo.activeUntil),
        }
      : {
          _id: "",
          activeUntil: formatDate(new Date()),
          attachments: [],
          completed: false,
          description: "",
          title: "",
        }
  );

  return (
    <div className='todoPage todoEditPage'>
      <h3>{header}</h3>
      <Box>
        <form className='todo'>
          <Button onClick={() => navigate("/todo/list")}>
            <img src='/icons/arrowLeft.svg' alt='стрелка вернуться назад' />
            <span>Назад</span>
          </Button>
          <div className='todoEditInputs'>
            <TextInput placeholder='название' onChange={updateTodo} value={todo.title} name='title' />
            <textarea placeholder='описание' onChange={updateTodo} value={todo.description} name='description' />
            <div>
              <div>
                <label htmlFor='completed'>выполнено?</label>
                <input
                  id='completed'
                  type={"checkbox"}
                  onChange={updateTodo}
                  checked={todo.completed}
                  name='completed'
                />
              </div>
              <div>
                <span>дата</span>
                <input type={"datetime-local"} value={todo.activeUntil} onChange={updateTodo} name='activeUntil' />
              </div>
            </div>
            <div className='attachments'>
              <div className='attachmentsHeader'>
                <span>файлы</span>
                <label htmlFor='files-attachment'>прикрепить</label>
                <input id='files-attachment' type={"file"} onChange={uploadFiles} multiple />
              </div>
              <span className='typesAlert'>
                разрешены только: <b>jpg, jpeg, png, txt, md</b>
              </span>
              <ul className='todoAttachments'>
                {[...Array.from(filesList), ...(todo.attachments as (File | string)[])].map((file, i) => (
                  <li key={(file instanceof File ? String(file.size) : file) + i + new Date().toISOString()}>
                    <Box>
                      <span>{file instanceof File ? file.name : file.slice(37)}</span>
                      <div>
                        <ChooseIcon name={`${file instanceof File ? file.name : file}`.split(".").pop()!} />
                        <Button onClick={() => deleteFile(file instanceof File ? file.name : file)} type='button'>
                          <ChooseIcon name={"cross"} />
                        </Button>
                      </div>
                    </Box>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </Box>
      <Button onClick={onSubmitHandler}>{submitText}</Button>
    </div>
  );
};

export default TodoEdit;
