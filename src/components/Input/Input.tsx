import React from "react";
import { useState } from "react";
import { HTMLInputTypeAttribute } from "react";

export interface InputParams {
  type: HTMLInputTypeAttribute;
  name: string;

  required?: boolean;
  autoFocus?: boolean;
  placeholder?: string;

  min?: number;
  max?: number;
  step?: number;
}

export const Input: React.FC<{
  params: InputParams;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ params, onChangeHandler }) => {
  const [value, setValue] = useState<string | number>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChangeHandler(e);
  };

  return (
    <input className='input-medium' data-test='component-input' value={value} onChange={handleChange} {...params} />
  );
};
