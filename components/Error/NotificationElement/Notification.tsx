import { useAction } from "@/store/helpers";
import { INotification } from "@/store/reducers/notificationsSlice";
import React, { useEffect } from "react";
import styles from "./notification.module.scss";

export const Notification: React.FC<INotification> = ({ content, type, uuid, timeout }) => {
  const { deleteNotification } = useAction();

  useEffect(() => {
    let notificationTimeout = setTimeout(() => {
      deleteNotification({ uuid });
    }, timeout);

    return () => clearTimeout(notificationTimeout);
  }, []);

  return (
    <li className={`${styles[type]} ${styles.notification}`} key={uuid}>
      {content}
    </li>
  );
};
