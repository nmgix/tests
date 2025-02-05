import React from "react";
import classes from "./styles.module.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  active?: boolean;
  asLink?: boolean;
  color?: string;
  rounded?: boolean;
  dontStretch?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, asLink, active, color, children, rounded, dontStretch }) => {
  const buttonStyles: React.CSSProperties = {
    color: color ? color : "inherit",
    borderRadius: rounded ? "50px" : "7px",
    alignSelf: dontStretch ? "flex-start" : "unset",
  };

  return (
    <button
      style={buttonStyles}
      className={`${classes.button} ${asLink ? classes.buttonAsLink : classes.buttonDefault} ${
        active ? classes.active : ""
      }`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
