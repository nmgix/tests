import { createSlice } from "@reduxjs/toolkit";
import { CreateNotifocationAction, DeleteNotifocationAction } from "../types/notificationsActions";
import { v4 as uuid } from "uuid";

type NotificationTypes = "warning" | "informative" | "success";

export type INotification = {
  uuid: string;
  content: string;
  type: NotificationTypes;
  timeout: number;
};

type TodosState = INotification[];

const initialState: TodosState = [];

export const createNotificationTemplate: (text: string, type: NotificationTypes, timeout: number) => INotification = (
  text,
  type,
  timeout
) => ({ content: text, type, timeout, uuid: uuid() });

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNotification(state, action: CreateNotifocationAction) {
      state.push(action.payload);
    },
    deleteNotification(state, action: DeleteNotifocationAction) {
      return state.filter((notification) => notification.uuid !== action.payload.uuid);
    },
  },
});

export const notificationsAction = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
