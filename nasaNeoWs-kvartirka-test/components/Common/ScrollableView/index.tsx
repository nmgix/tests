import React from "react";
import classes from "./styles.module.scss";

type ScrollableViewProps = {
  children: React.ReactNode;
  horizontalScroll?: boolean;
};

const ScrollableView: React.FC<ScrollableViewProps> = ({ children, horizontalScroll }) => {
  return (
    <div className={classes.scrollableView} style={{ overflowX: horizontalScroll ? "scroll" : "hidden" }}>
      {children}
    </div>
  );
};

ScrollableView.displayName = "ScrollableView";

export default ScrollableView;
