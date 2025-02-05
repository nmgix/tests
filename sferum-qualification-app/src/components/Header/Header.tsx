import { useContext } from "react";
import { Context } from "../../store/Context";
import "./_header.scss";

var logo = require("../../resources/images/logo.svg").default;

export const Header = () => {
  const {
    state: { balance },
  } = useContext(Context);

  return (
    <header>
      <div className='title'>
        <img src={logo} alt='bookshop logo' draggable={false} />
        <h3>Магазин книг</h3>
      </div>
      <div className='balance'>
        <span>Баланс: {balance} руб.</span>
      </div>
    </header>
  );
};
