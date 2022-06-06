import { useContext, useState } from "react";
import { BuyItems, DeleteItem } from "../../store/ActionCreators";
import { Context } from "../../store/Context";
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
  const [mobileMenuOpen, setMenu] = useState<boolean>(false);
  const {
    state: { items },
    dispatch,
  } = useContext(Context);

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
