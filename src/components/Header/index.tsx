import Logo from "../Logo";

const Header: React.FC<{}> = () => {
  return (
    <nav>
      <Logo size='l' />
      <ul>
        <li>Главная</li>
        <li>Технология</li>
        <li>График полетов</li>
        <li>Гарантии</li>
        <li>О компании</li>
        <li>Контакты</li>
      </ul>
    </nav>
  );
};

export default Header;
