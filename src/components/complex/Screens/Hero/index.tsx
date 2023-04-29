import Button from "components/basic/Button";
import classnames from "./hero.screen.module.scss";

const advantages = {
  pc: [
    {
      title: "Виджеты",
      description: "30 готовых решений"
    },
    {
      title: "Dashboard",
      description: "с показателями вашего бизнеса"
    },
    {
      title: "Skype Аудит",
      description: "отдела продаж и CRM системы"
    },
    {
      title: "35 дней",
      description: "использования CRM"
    }
  ],
  mobile: [
    {
      title: "Skype аудит"
    },
    {
      title: "30 виджетов"
    },
    { title: "Dashboard" },
    { title: "Месяц аmoCRM" }
  ]
};

const HeroScreen: React.FC = () => {
  return (
    <section className={classnames.heroScreen}>
      <div className={classnames.hero}>
        <h1>
          Зарабатывайте больше
          <br />
          <b>с WELBEX</b>
        </h1>
        <p>Развиваем и контролируем продажи за вас</p>
      </div>
      <div className={classnames.advantanges}>
        <div className={classnames.pc}>
          <div className={classnames.pcContent}>
            <h3>
              {/* тут внутри <b> капсом */}
              Вместе с 
              <b>
                бесплатной
                <br />
                консультацией
              </b>
               мы дарим:
            </h3>
            <ul>
              {advantages.pc.map(a => (
                <li>
                  <h4>{a.title}</h4>
                  <p>{a.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={() => console.log("Пока не реализовано :(")} title={"Получить консультацию"} />
        </div>
        <div className={classnames.mobile}>
          <h3>
            Вместе с <b>бесплатной</b>
            <br />
            <b>консультацией</b> мы дарим:
          </h3>
          <ul>
            {advantages.mobile.map(a => (
              <li>
                <h4>{a.title}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default HeroScreen;
