import React from "react";
import classes from "./styles.module.scss";

const ScrollableView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={classes.scrollableView}>{children}</div>;
};

export default ScrollableView;
