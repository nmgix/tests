import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "src/widgets/Modal";

import "./promo.scss";
import { RateCard, RateCardDiscounted, TRateProps } from "src/entities/rate";

interface IPromoLastСhanceModalProps {
  closeModal: React.ComponentProps<typeof Modal>["closeModal"];
}
const PromoLastСhanceModal: React.FC<IPromoLastСhanceModalProps> = ({ closeModal }) => {
  const rateOptions: TRateProps[] = [
    {
      name: "1 неделя",
      price: 999,
      discount: 699,
      sidenote: "Чтобы просто начать 👍🏻"
    },
    {
      name: "1 месяц",
      price: 1690,
      discount: 999,
      sidenote: "Привести тело впорядок 💪🏻"
    },
    {
      name: "3 месяца",
      price: 5990,
      discount: 2990,
      sidenote: "Изменить образ жизни 🔥"
    }
  ];

  return (
    <Modal closeModal={closeModal} externalClassnames={["promo", "promo__last-chance"]}>
      <h1>
        Не упусти свой <mark>последний шанс</mark>
      </h1>
      <div className='last-chance__intro'>
        <h2 className='last-chance__title'>
          Мы знаем, как трудно начать.. <mark>Поэтому!</mark>
        </h2>
        <h2 className='last-chance__discount-doubledown'>
          <b>
            Дарим скидку для <mark>лёгкого старта</mark>
          </b>{" "}
          🏃‍♂️
        </h2>
      </div>
      <div className='last-chance__offer'>
        <span className='last-chance__title'>Посмотри, что мы для тебя приготовили 🔥</span>
        <ul className='last-chance__cards'>
          {rateOptions.map(r => (
            <li className='last-chance__card'>
              <RateCardDiscounted
                cardSelected={false}
                onInputSelect={() => console.log("выбрал эту карточку")}
                price={r.price}
                name={r.name}
                discount={r.discount}
                discountActive={true}
              />
            </li>
          ))}
        </ul>
      </div>
      <button className='promo__buy-btn'>Начать тренироваться</button>
    </Modal>
  );
};

export const PromoPage = () => {
  const [privacyAccept, setPrivacyAccept] = useState(false);
  const [lastChance, setLastChance] = useState(false); // в будущем с глобал стейта

  const pageRef = useRef<HTMLDivElement>(null);

  const rateOptions: TRateProps[] = [
    {
      name: "1 неделя",
      price: 999,
      discount: 699,
      sidenote: "Чтобы просто начать 👍🏻"
    },
    {
      name: "1 месяц",
      price: 1690,
      discount: 999,
      sidenote: "Привести тело впорядок 💪🏻"
    },
    {
      name: "3 месяца",
      price: 5990,
      discount: 2990,
      sidenote: "Изменить образ жизни 🔥"
    },
    {
      name: "Навсегда",
      price: 18990,
      discount: 5990,
      sidenote: "Всегда быть в форме и поддерживать своё здоровье ⭐️"
    }
  ];

  const discAct = true; // с глобал стейта

  return (
    <>
      <div className='promo__wrapper'>
        <div className='page promo' id='promo' ref={pageRef}>
          <h1 className='promo__title'>Выберите подходящий тарифный план</h1>
          <img className='promo__image' draggable='false' src='/assets/images/to_be_2.png' alt='накачанный мужчина' />
          <div className='promo__content'>
            <div className='rate__wrapper'>
              <ul className='rate__options'>
                {rateOptions.map((r, i) => (
                  <li className='rate__option'>
                    <RateCard {...r} discountActive={discAct} externalClassNames={(i + 1) % 4 === 0 ? "rate-card--horizontal" : undefined} />
                  </li>
                ))}
              </ul>
              <span className='rate__sidenote'>Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц</span>
            </div>
            <div className='promo__privacy-policy'>
              <input className='privacy-policy__input' type='checkbox' checked={privacyAccept} onChange={e => setPrivacyAccept(e.target.checked)} />
              <span className='privacy-policy__description'>
                Я соглашаюсь с{" "}
                <Link className='privacy-policy__link' to={"/"}>
                  правилами сервиса
                </Link>{" "}
                и условиями{" "}
                <Link className='privacy-policy__link' to={"/"}>
                  публичной оферты.
                </Link>
              </span>
            </div>
            <div className='promo__checkout'>
              <button className='checkout__btn'>Купить</button>
              <span className='checkout__sidenote'>
                Нажимая «Купить», Пользователь соглашается на автоматическое списание денежных средств по истечению купленного периода. Дальнейшие
                списания по тарифам участвующим в акции осуществляются по полной стоимости согласно оферте.
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* {lastChance && pageRef.current && createPortal(<PromoLastСhanceModal />, pageRef.current)} */}
      {lastChance && <PromoLastСhanceModal closeModal={() => setLastChance(c => !c)} />}
    </>
  );
};
