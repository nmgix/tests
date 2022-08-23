import React, { Fragment } from "react";
import classes from "../Secondary/styles.module.scss";

type HeaderWrapperProps = {
  title: string;
  children: React.ReactNode;
  childrenInTitle?: React.ReactNode;
  withDate?: Date;
};

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ title, children, withDate, childrenInTitle }) => {
  return (
    <div className={classes.upperHeader}>
      <div className={classes.titleWrapper}>
        {childrenInTitle ? childrenInTitle : <></>}
        <div className={classes.title}>
          <h2>{title}</h2>
          {withDate ? (
            <time>{withDate.toLocaleDateString("ru", { day: "2-digit", month: "long", year: "numeric" })}</time>
          ) : (
            <></>
          )}
        </div>
      </div>
      <hr />
      <Fragment>{children}</Fragment>
    </div>
  );
};

HeaderWrapper.displayName = "HeaderWrapper";

export default HeaderWrapper;
