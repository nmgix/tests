import classNames from "classnames";
import React, { CSSProperties, useEffect, useId, useState } from "react";
import addMonths from "../../../helpers/addDate";

import styles from "./Input.module.scss";

type InputProps = {
  onChange: (x?: any) => any;
  value: any;
  label: string;
  name: string;
  type?: "text" | "date";
  placeholder?: string;
  overrideStyles?: CSSProperties;
  textMin?: number;
  textMax?: number;
  dateMin?: string;
  dateMax?: string;
};

export const Input: React.FC<InputProps> = ({
  overrideStyles,
  onChange,
  value,
  type,
  label,
  name,
  placeholder,
  textMin,
  textMax,
  dateMin,
  dateMax,
}) => {
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
    <label htmlFor={inputId} className={classNames(styles.inputLabel)}>
      <span className={classNames(styles.inputLabelContent)}>{label}</span>
      <input
        id={inputId}
        name={name}
        className={styles.inputComponent}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Введите текст"}
        type={type ? type : "text"}
        value={value}
        style={overrideStyles}
        min={type === "date" ? (dateMin && dateMin.length > 0 ? dateMin : borders.min) : undefined}
        max={type === "date" ? (dateMax && dateMax.length > 0 ? dateMax : borders.max) : undefined}
        minLength={textMin}
        maxLength={textMax}
      />
    </label>
  );
};
