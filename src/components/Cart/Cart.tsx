import { useState } from "react";
import "./_cart.scss";
var cartIcon = require("../../resources/images/cart.svg").default;

export const Cart = () => {
  const [items, setItems] = useState<string[]>(["one", "two", "three"]);

  return (
    <div className='cart'>
      <div className='cart-header'>
        <h2>Корзина</h2>
        <img src={cartIcon} alt='Изображение корзины' draggable={false} />
      </div>
      {items.length > 0 ? (
        <>
          <ul className='cart-list'></ul>
          <div className='cart-total'>
            <span>
              <h2>{"3230"}</h2> руб.
            </span>
            <button className='button button-main button-x'>Купить</button>
          </div>
        </>
      ) : (
        <h4 className='helper-text'>Нет добавленных книг</h4>
      )}
    </div>
  );
};
