import { INotification } from "@/store/reducers/notificationsSlice";
import React from "react";
import styles from "./notification.module.scss";

export const Notification: React.FC<INotification> = ({ content, type, uuid }) => {
  return (
    <li className={`${styles[type]} ${styles.notification}`} key={uuid}>
      {content}
    </li>
  );
};
