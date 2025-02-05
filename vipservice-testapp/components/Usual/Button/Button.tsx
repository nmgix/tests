import React, { CSSProperties } from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (x?: any) => any;
  overrideStyles?: CSSProperties;
  disabled?: boolean;
  classnames?: string[];
};

export const Button: React.FC<ButtonProps> = ({ children, overrideStyles, onClick, disabled, classnames }) => {
  return (
    <button
      className={classNames(classnames ? [...classnames, styles.button] : styles.button)}
      onClick={onClick}
      type={"button"}
      disabled={disabled}
      style={overrideStyles}>
      {children}
    </button>
  );
};
