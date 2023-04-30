import Icon from "components/basic/Icon";
import Link from "components/basic/Link";
import classnames from "./header.module.scss";
import "components/basic/Link/link.scss";
import classNamesConcat from "classnames";

const navLinks = {
  pc: [
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
  ],
  mobile: [
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
    }
  ]
};

const Header: React.FC = () => {
  return (
    <>
      <header className={classNamesConcat(classnames.wrapper, classnames.pc)}>
        <div className={classnames.logo}>
          <Icon icon='logo_welbex' noAspectRatio />
        </div>
        <nav className={classNamesConcat(classnames.navMenu)}>
          {navLinks.pc.map(nl => (
            <Link link={nl.link} component={<span>{nl.title}</span>} />
          ))}
        </nav>
        <div className={classnames.links}>
          <div className={"phone"}>
            <Link link='tel:+75555555555' component={<span>+7 555 555-55-55</span>} />
          </div>
          <div className={classnames.linksNested}>
            <Link link='tg://resolve?domain=bzbrznslnshk' component={<Icon icon='telegram' />} />
            <Link link='viber://chat?number=%2B75555555555' component={<Icon icon='viber' />} />
            <Link link='whatsapp://send?text=Hello&phone=+75555555555' component={<Icon icon='whatsapp' />} />
          </div>
        </div>
      </header>
      <header className={classNamesConcat(classnames.wrapper, classnames.mobile)}>
        {/* <div className={classnames.logo}>
          <Icon icon='logo_welbex' noAspectRatio />
        </div> */}
        <nav className={classNamesConcat(classnames.navMenu)}>
          {navLinks.mobile.map(nl => (
            <Link link={nl.link} component={<span>{nl.title}</span>} />
          ))}
        </nav>
      </header>
    </>
  );
};

export default Header;
