import Link from "components/basic/Link";
import classnames from "./footer.module.scss";
import classNamesConcat from "classnames";
import Icon from "components/basic/Icon";
import "components/basic/Link/link.scss";

const navLinks = {
  pc: [
    {
      title: "О компании",
      links: [
        {
          link: "/partnership",
          title: "Партнёрская программа"
        },
        {
          link: "/vacancies",
          title: "Вакансии"
        }
      ]
    },
    {
      title: "Меню",
      links: [
        {
          link: "/cost-calculation",
          title: "Расчёт стоимости"
        },
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
          link: "/our-clients",
          title: "Наши клиенты"
        },
        {
          link: "/cases",
          title: "Кейсы"
        },
        {
          link: "/grateful-letters",
          title: "Благодарственные письма"
        },
        {
          link: "/certificates",
          title: "Сертификаты"
        },
        {
          link: "/youtube-blog",
          title: "Блог на Youtube"
        },
        {
          link: "/qa",
          title: "Вопрос / Ответ"
        }
      ]
    }
  ],
  mobile: [
    {
      title: "О компании",
      links: [
        {
          link: "/partnership",
          title: "Партнёрская программа"
        },
        {
          link: "/vacancies",
          title: "Вакансии"
        }
      ]
    },
    {
      title: "Меню",
      links: [
        {
          link: "/cost-calculation",
          title: "Расчёт стоимости"
        },
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
          link: "/our-clients",
          title: "Наши клиенты"
        },
        {
          link: "/customer-gratitude",
          title: "Благодарность клиентов"
        },
        {
          link: "/cases",
          title: "Кейсы"
        },
        {
          link: "/certificates",
          title: "Сертификаты"
        },
        {
          link: "/youtube-blog",
          title: "Блог на Youtube"
        },
        {
          link: "/qa",
          title: "Вопрос / Ответ"
        }
      ]
    }
  ]
};

const Footer: React.FC = () => {
  return (
    <footer className={classnames.wrapper}>
      <div className={classNamesConcat(classnames.main, classnames.pc)}>
        {navLinks.pc.map(gl => (
          <div className={classnames.list}>
            <h3>{gl.title}</h3>
            <ul>
              {gl.links.map(l => (
                <li>
                  <Link component={l.title} link={l.link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={classNamesConcat(classnames.list, classnames.contacts)}>
          <h3>Контакты</h3>
          <ul>
            <li className={"phone"}>
              <Link link='tel:+75555555555' component={<span>+7 555 555-55-55</span>} />
            </li>
            <li className={classnames.contactsLinks}>
              <Link link='tg://resolve?domain=dnl_chstv' component={<Icon icon='telegram' />} />
              <Link link='viber://chat?number=%2B75555555555' component={<Icon icon='viber' />} />
              <Link link='whatsapp://send?text=Hello&phone=+75555555555' component={<Icon icon='whatsapp' />} />
            </li>
            <li>Москва, Путевой проезд 3с1, к 902</li>
          </ul>
        </div>
      </div>
      <div className={classNamesConcat(classnames.main, classnames.mobile)}>
        {navLinks.mobile.map(gl => (
          <div className={classnames.list}>
            <h3>{gl.title}</h3>
            <ul>
              {gl.links.map(l => (
                <li>
                  <Link component={l.title} link={l.link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={classNamesConcat(classnames.list, classnames.contacts)}>
          <h3>Контакты</h3>
          <ul>
            <li className={"phone"}>
              <Link link='tel:+75555555555' component={<span>+7 555 555-55-55</span>} />
            </li>
            <li className={classnames.contactsLinks}>
              <Link link='tg://resolve?domain=dnl_chstv' component={<Icon icon='telegram' />} />
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
