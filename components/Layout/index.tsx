import React, { Fragment } from "react";
import { ApodImage } from "../../types/asteroid";
import HeaderMain from "../Header/Main";

type LayoutProps = {
  apod: ApodImage;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children, apod }) => {
  return (
    <Fragment>
      <HeaderMain imgUrl={apod?.url} />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
