import "./_header.scss";

// @ https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
var logo = require("../../resources/images/logo.svg").default;

export const Header = () => {
  return (
    <header>
      <div className='title'>
        <img src={logo} alt='bookshop logo' draggable={false} />
        <h3>Магазин книг</h3>
      </div>
      <div className='balance'>
        <span>Баланс: {"5"} руб.</span>
      </div>
    </header>
  );
};
