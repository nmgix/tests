import React from "react";
import classes from "./styles.module.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  asLink?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, asLink, children }) => {
  return (
    <button className={asLink ? classes.buttonAsLink : classes.buttonDefault} onClick={onClick}>
      {children}
    </button>
  );
};
