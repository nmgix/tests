import React from "react";
import classes from "./styles.module.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean;
  asLink?: boolean;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, asLink, active, color, children }) => {
  return (
    <button
      style={color ? { color } : {}}
      className={`${classes.button} ${asLink ? classes.buttonAsLink : classes.buttonDefault} ${
        active ? classes.active : ""
      }`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
