import React from "react";
import { useEffect } from "react";

/**
 * @param { boolean } active Значение из хука useState
 * @param { React.SetStateAction } closeFunc Функция из хука useState
 * @param { string }   data.title Заголовок тоаста
 * @param { string } data.body Текст тоаста
 * @param { number } closeTimeout Опциональное значение, задаёт таймаут для исчезновения тоаста
 * @param { string } extClassname Опциональное значение, даёт возможность добавить свои классовые значения, допустим для настройки стилей бутстрапом
 * @param { React.CSSProperties } extStyles Опциональное значение, добавляет встроенные стили к общему div тоаста
 * @returns Красивый тоаст с информацией
 */
export const Toast: React.FC<{
  active: boolean;
  closeFunc: React.Dispatch<React.SetStateAction<boolean>>;
  data: { title: string; body: string };
  closeTimeout?: number;
  extClassname?: string;
  extStyles?: React.CSSProperties;
}> = ({ active, closeFunc, data, closeTimeout, extClassname, extStyles }) => {
  useEffect(() => {
    if (active && closeTimeout) {
      let timeout = setTimeout(() => closeFunc(false), closeTimeout);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [active]);

  if (active) {
    // downgrade from 5.1.3 to 4.5.3 fixed the issue with not appeded styles
    return (
      <div
        className={`toast show ${extClassname}`}
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
        style={extStyles}>
        <div className='toast-header'>
          {/* <img src='...' className='rounded mr-2' alt='...' /> */}
          <strong className='mr-auto'>{data.title}</strong>
          {/* <small className='text-muted'>just now</small> */}
          <button
            type='button'
            className='ml-2 mb-1 close'
            data-dismiss='toast'
            aria-label='Close'
            onClick={() => closeFunc(false)}>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='toast-body'>{data.body}</div>
      </div>
    );
  }

  return <></>;
};
