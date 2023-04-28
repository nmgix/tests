import Icon from "components/basic/Icon";
import Link from "components/basic/Link";

import styles from "./header.module.scss";

const navLinks: { link: string; title: string }[] = [
  {
    link: "/services",
    title: "Услуги"
  },
  {
    link: "/widgets",
    title: "Виджеты"
  },
  {
    link: "/integrations",
    title: "Интеграции"
  },
  {
    link: "/cases",
    title: "Кейсы"
  },
  {
    link: "/certificates",
    title: "Сертификаты"
  }
];

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <Icon icon='logo_welbex' noAspectRatio />
      </div>
      <nav className={styles.navMenu}>
        {navLinks.map(nl => (
          <Link link={nl.link} component={<span>{nl.title}</span>} />
        ))}
      </nav>
      <div className={styles.links}>
        <Link link='tel:+75555555555' component={<span>+7 555 555-55-55</span>} />
        <div className={styles.linksNested}>
          <Link link='tg://resolve?domain=bzbrznslnshk' component={<Icon icon='telegram' />} />
          <Link link='viber://chat?number=%2B75555555555' component={<Icon icon='viber' />} />
          <Link link='whatsapp://send?text=Hello&phone=+75555555555' component={<Icon icon='whatsapp' />} />
        </div>
      </div>
    </header>
  );
};

export default Header;
