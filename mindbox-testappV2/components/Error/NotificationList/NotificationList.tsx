import styles from "./notificationsList.module.scss";
import React from "react";
import { Notification } from "../NotificationElement/Notification";
import { useAppSelector } from "@/store/helpers";

export const NotificationList: React.FC<{}> = () => {
  const notifications = useAppSelector((state) => state.notifications);

  return notifications.length > 0 ? (
    <ul className={styles.notificationsWrapper}>
      {notifications.slice(-5).map((notification) => (
        <Notification {...notification} key={notification.uuid} />
      ))}
    </ul>
  ) : (
    <></>
  );
};
