import React, { useContext, useEffect, useRef, useState } from "react";
import { BuyItems, DeleteItem } from "../../store/ActionCreators";
import { Context } from "../../store/Context";
import { v4 as uuidv4 } from "uuid";
import "./_cart.scss";
import { Actions, CartActions } from "../../store/Reducer";
var cartIcon = require("../../resources/images/cart.svg").default;
var cross = require("../../resources/images/cross.svg").default;

export type CartItem = {
  id: string;
  title: string;
  count: number;
  price: number;
};

type ToastShortened = {
  uuid: string;
  error: string;
  timeOut: number;
};

type ToastData = {
  errors: ToastShortened[];
  setErrors: React.Dispatch<React.SetStateAction<ToastShortened[]>>;
  dispatch: React.Dispatch<CartActions>;
} & ToastShortened;

const MiniToast: React.FC<ToastData> = ({ uuid, error, timeOut, errors, setErrors, dispatch }) => {
  var ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      var timer = setTimeout(() => {
        setErrors(errors.filter((currentError) => currentError.uuid !== uuid));
        dispatch({ type: Actions.ClearError });
      }, timeOut);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, errors, setErrors, timeOut, uuid]);

  return (
    <div ref={ref} className='toast toast-error'>
      {error}
    </div>
  );
};

export const Cart = () => {
  const [mobileMenuOpen, setMenu] = useState<boolean>(false);
  const {
    state: { items, error },
    dispatch,
  } = useContext(Context);

  const [errors, setErrors] = useState<ToastShortened[]>([]);
  useEffect(() => {
    if (error) {
      setErrors((errors) => [...errors, { error, timeOut: 5000, uuid: uuidv4() }]);
    }
  }, [error]);

  return (
    <div className={`cart ${mobileMenuOpen ? "cart-active" : ""}`}>
      <div className='cart-header' onClick={() => setMenu(!mobileMenuOpen)}>
        <h2>Корзина</h2>
        <img src={cartIcon} alt='Изображение корзины' draggable={false} />
      </div>
      {items.length > 0 ? (
        <>
          <ul className='cart-list'>
            {items.map((item) => (
              <li key={item.id} className='cart-item'>
                <div className='main'>
                  <h3>{item.title}</h3>
                  <span className='helper-text'>{item.count} шт.</span>
                  <span className='price'>
                    <b>{item.count * item.price}</b> руб.
                  </span>
                </div>
                <img
                  src={cross}
                  alt={`Удалить ${item.title} из корзины`}
                  onClick={() => DeleteItem(dispatch, item.id)}
                />
              </li>
            ))}
          </ul>
          <div className='cart-total'>
            <div className='main'>
              <span>
                <h2>{items.reduce((sum, item) => sum + item.price * item.count, 0)}</h2> руб.
              </span>
              <div className='toast-wrapper'>
                {errors.map((currentError) => (
                  <MiniToast
                    key={currentError.uuid}
                    error={currentError.error}
                    errors={errors}
                    setErrors={setErrors}
                    uuid={currentError.uuid}
                    timeOut={currentError.timeOut}
                    dispatch={dispatch}
                  />
                ))}
              </div>
              <button className='button button-main button-x' onClick={() => BuyItems(dispatch)}>
                Купить
              </button>
            </div>
          </div>
        </>
      ) : (
        <h4 className='helper-text'>Нет добавленных книг</h4>
      )}
    </div>
  );
};
