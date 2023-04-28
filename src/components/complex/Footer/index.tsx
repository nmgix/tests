import Link from "components/basic/Link";
import classnames from "./footer.module.scss";
import classNamesConcat from "classnames";
import Icon from "components/basic/Icon";
import "components/basic/Link/link.scss";

const Footer: React.FC = () => {
  return (
    <footer className={classnames.wrapper}>
      <div className={classnames.main}>
        <div className={classnames.list}>
          <h3>О компании</h3>
          <ul>
            <li>Партнёрская программа</li>
            <li>Вакансии</li>
          </ul>
        </div>
        <div className={classnames.list}>
          <h3>Меню</h3>
          <ul>
            <li>Расчёт стоимости</li>
            <li>Услуги</li>
            <li>Виджеты</li>
            <li>Интеграции</li>
            <li>Наши клиенты</li>
            <li>Кейсы</li>
            <li>Благодарственные письма</li>
            <li>Сертификаты</li>
            <li>Блог на Youtube</li>
            <li>Вопрос / Ответ</li>
          </ul>
        </div>
        <div className={classNamesConcat(classnames.list, classnames.contacts)}>
          <h3>Контакты</h3>
          <ul>
            <li className={"phone"}>
              <Link link='tel:+75555555555' component={<span>+7 555 555-55-55</span>} />
            </li>
            <li className={classnames.contactsLinks}>
              <Link link='tg://resolve?domain=bzbrznslnshk' component={<Icon icon='telegram' />} />
              <Link link='viber://chat?number=%2B75555555555' component={<Icon icon='viber' />} />
              <Link link='whatsapp://send?text=Hello&phone=+75555555555' component={<Icon icon='whatsapp' />} />
            </li>
            <li>Москва, Путевой проезд 3с1, к 902</li>
          </ul>
        </div>
      </div>
      <div className={classnames.credentials}>
        <span>©WELBEX 2022. Все права защищены.</span>
        <Link link='/policy' component={<span>Политика конфиденциальности</span>} />
      </div>
    </footer>
  );
};

export default Footer;
