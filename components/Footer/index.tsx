import React from "react";
import classes from "./styles.module.scss";

const Footer = () => {
  return <footer className={classes.footerMain}>{new Date().getFullYear()} © Все права и планета защищены</footer>;
};

export default Footer;
