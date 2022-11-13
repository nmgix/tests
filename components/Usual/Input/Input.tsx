import React, { CSSProperties, useEffect, useId, useState } from "react";
import { addMonths } from "../../../helpers/addDate";

import styles from "./Input.module.scss";

type InputProps = {
  onChange: (x?: any) => any;
  value: any;
  label: string;
  type?: "text" | "date";
  placeholder?: string;
  overrideStyles?: CSSProperties;
};

const Input: React.FC<InputProps> = ({ overrideStyles, onChange, value, type, label, placeholder }) => {
  const inputId = useId();
  const [borders, setBorders] = useState<{ min: string; max: string }>(() => {
    return {
      min: "01.01." + new Date().getFullYear(),
      max: "02.01." + new Date().getFullYear(),
    };
  });
  useEffect(() => {
    setBorders({
      min: new Date().toString(),
      max: addMonths(new Date(), 1).toString(),
    });
  }, []);

  return (
    <label htmlFor={inputId} className={styles.inputLabel}>
      {label}
      <input
        id={inputId}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Введите текст"}
        type={type ? type : "text"}
        value={value}
        style={overrideStyles}
        className={styles.inputComponent}
        min={type === "date" ? borders.min : undefined}
        max={type === "date" ? borders.max : undefined}
      />
    </label>
  );
};

export default Input;
