import { useState } from "react";
import "./_cart.scss";
var cartIcon = require("../../resources/images/cart.svg").default;
var cross = require("../../resources/images/cross.svg").default;

export type CartItem = {
  id: string;
  title: string;
  count: number;
  price: number;
};

export const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "6053518393",
      title: "Не заставляйте меня думать",
      count: 1,
      price: 870,
    },
    {
      id: "6012485021",
      title: "Отзывчивый веб-дизайн",
      count: 2,
      price: 700,
    },
    {
      id: "6013099362",
      title: "Дизайн - это работа",
      count: 3,
      price: 320,
    },
  ]);

  const deleteItem = (itemId: string) => {};

  return (
    <div className='cart'>
      <div className='cart-header'>
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
                <img src={cross} alt={`Удалить ${item.title} из корзины`} />
              </li>
            ))}
          </ul>
          <div className='cart-total'>
            <div className='main'>
              <span>
                <h2>{"3230"}</h2> руб.
              </span>
              <button className='button button-main button-x'>Купить</button>
            </div>
          </div>
        </>
      ) : (
        <h4 className='helper-text'>Нет добавленных книг</h4>
      )}
    </div>
  );
};
