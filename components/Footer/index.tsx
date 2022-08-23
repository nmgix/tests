import React from "react";
import classes from "./styles.module.scss";

const Footer: React.FC = () => {
  return <footer className={classes.footerMain}>{new Date().getFullYear()} © Все права и планета защищены</footer>;
};

Footer.displayName = "Footer";

export default Footer;
