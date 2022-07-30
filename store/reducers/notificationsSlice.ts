import { createSlice } from "@reduxjs/toolkit";
import { CreateNotifocationAction, DeleteNotifocationAction } from "../types/errorsActions";
import { v4 as uuid } from "uuid";

export type INotification = {
  uuid: string;
  content: string;
  type: "warning" | "informative" | "success";
  timeout: number;
};

type TodosState = INotification[];

const initialState: TodosState = [
  {
    content:
      "Любая строчка очень длиннаая, это не шутка, очень длиннаая, это не шутка, очень длиннаая, это не шутка, очень длиннаая, это не шутка",
    timeout: 3000,
    type: "warning",
    uuid: uuid(),
  },
  {
    content: "Любая строчка",
    timeout: 3000,
    type: "informative",
    uuid: uuid(),
  },
  {
    content: "Любая строчка",
    timeout: 3000,
    type: "success",
    uuid: uuid(),
  },
  {
    content: "Любая строчка",
    timeout: 3000,
    type: "success",
    uuid: uuid(),
  },
  {
    content: "Любая строчка",
    timeout: 3000,
    type: "success",
    uuid: uuid(),
  },
  {
    content: "Любая строчка",
    timeout: 3000,
    type: "success",
    uuid: uuid(),
  },
  {
    content: "Любая строчка",
    timeout: 3000,
    type: "success",
    uuid: uuid(),
  },
  {
    content: "Любая строчка",
    timeout: 3000,
    type: "success",
    uuid: uuid(),
  },
];

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNotification(state, action: CreateNotifocationAction) {
      state.push(action.payload);
    }, //мидлвар на удаление этой туду через какой-то период
    deleteNotification(state, action: DeleteNotifocationAction) {
      // console.log("deleteing", action.payload.uuid);
      // console.log(state.length);
      // let filtered = state.filter((notification) => {
      //   console.log(notification.uuid !== action.payload.uuid);
      //   return notification.uuid !== action.payload.uuid;
      // });
      // console.log("filtered before", filtered.length, state.length);
      // state = filtered;
      // console.log("filtered after", filtered.length, state.length);
      // console.log(state.length);
    },
  },
});

export const notificationsAction = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
