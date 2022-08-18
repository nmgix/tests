import React from "react";
import classes from "./styles.module.scss";

export const ScrollableView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={classes.scrollableView}>{children}</div>;
};
