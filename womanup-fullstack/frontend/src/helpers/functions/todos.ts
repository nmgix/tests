import axios from "axios";
import { ITodo } from "../../types/ITodo";

export function updateTodo(formData: FormData) {
  return axios
    .patch("process.env.SERVER_ADDRESS/todo/", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .catch((err) => err);
}

export function createTodo(formData: FormData) {
  return axios
    .post("process.env.SERVER_ADDRESS/todo/", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .catch((err) => err);
}

export function getTodos(from: number, to: number): Promise<ITodo[]> {
  return axios
    .get<any, { data: ITodo[] }>("process.env.SERVER_ADDRESS/todo/", {
      params: {
        from,
        to,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    });
}

export function getTodo(todoId: string): Promise<ITodo> {
  return axios
    .get<{}, { data: ITodo }>(`process.env.SERVER_ADDRESS/todo/${todoId}`, { withCredentials: true })
    .then((res) => res.data);
}

export function fetchFile(attachmentName: string) {
  return axios
    .get(`process.env.SERVER_ADDRESS/static/${attachmentName}`, {
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
    });
}
