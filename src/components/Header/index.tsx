import Logo from "../Logo";
import "./_header.scss";

const Header: React.FC<{}> = () => {
  return (
    <nav className='borders'>
      <div className='content'>
        <Logo size='l' />
        <ul>
          <li>
            <a href='#'>Главная</a>
          </li>
          <li>
            <a href='#'>Технология</a>
          </li>
          <li>
            <a href='#'>График полетов</a>
          </li>
          <li>
            <a href='#'>Гарантии</a>
          </li>
          <li>
            <a href='#'>О компании</a>
          </li>
          <li>
            <a href='#'>Контакты</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
