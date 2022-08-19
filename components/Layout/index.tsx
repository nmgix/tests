import React, { Fragment } from "react";
import { ApodData } from "../../types/apod";
import HeaderMain from "../Header/Main";
import classes from "./styles.module.scss";

type LayoutProps = ApodData & {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ apod, children }) => {
  return (
    <Fragment>
      <HeaderMain imgUrl={apod.url} />
      <main className={classes.layoutMain}>{children}</main>
    </Fragment>
  );
};

export default Layout;
