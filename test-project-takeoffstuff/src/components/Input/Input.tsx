import React from "react";
import { useState } from "react";
import { HTMLInputTypeAttribute } from "react";

import "./_input.scss";

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

/**
 *
 * @param { HTMLInputTypeAttribute } params.type Тип инпута
 * @param { string } params.name Имя инпута
 *
 * @param { boolean } params.required Опциональное значение, необходимо ли это поле для формы
 * @param { boolean } params.autoFocus Опциональное значение, будет ли автофокус на данный инпут
 * @param { string } params.placeholder Опциональное значение, текст, когда инпут будет пустой
 *
 * @param { number } params.min Опциональное значение, минимальное значение, если инпут является number или range
 * @param { number } params.max Опциональное значение, максимальное значение, если инпут является number или range
 * @param { number } params.step Опциональное значение, шаг, если инпут является range
 *
 * @param { (e: React.ChangeEvent<HTMLInputElement>) => void } onChangeHandler Функция, котороя будет вызываться при изменении значения инпута
 * @param { string } extClassname Опциональное значение, даёт возможность добавить свои классовые значения, допустим для настройки стилей бутстрапом
 * @param { React.CSSProperties } extStyles Опциональное значение, добавляет встроенные стили к общему div тоаста
 *
 * @returns Красивый инпут
 */
export const Input: React.FC<{
  params: InputParams;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extClassname?: string;
  extStyles?: React.CSSProperties;
}> = ({ params, onChangeHandler, extClassname, extStyles }) => {
  const [value, setValue] = useState<string | number>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChangeHandler(e);
  };

  return (
    <input
      className={`input-medium form-control ${extClassname}`}
      data-test='component-input'
      value={value}
      onChange={handleChange}
      style={extStyles}
      {...params}
    />
  );
};
