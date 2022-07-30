import { PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../reducers/notificationsSlice";

export type CreateNotifocationAction = PayloadAction<INotification>;
export type DeleteNotifocationAction = PayloadAction<{ uuid: string }>;
