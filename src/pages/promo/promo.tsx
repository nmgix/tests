import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "src/widgets/Modal";

import "./promo.scss";
import { RateCardDiscounted } from "src/entities/rate";

interface IPromoLastСhanceModalProps {
  closeModal: React.ComponentProps<typeof Modal>["closeModal"];
}
const PromoLastСhanceModal: React.FC<IPromoLastСhanceModalProps> = ({ closeModal }) => {
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
          <li className='last-chance__card'>
            <RateCardDiscounted
              cardSelected={false}
              onInputSelect={() => console.log("выбрал эту карточку")}
              price={599}
              prevPrice={999}
              name='1 неделя (мок)'
            />
          </li>
          <li className='last-chance__card'></li>
          <li className='last-chance__card'></li>
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

  return (
    <>
      <div className='page promo' id='promo' ref={pageRef}>
        <h1 className='promo__title'>Выберите подходящий тарифный план</h1>
        <img className='promo__image' src='/assets/images/to_be_2.png' />
        <div className='promo__wrapper'>
          <div className='rate__wrapper'>
            <ul className='rate__options'>
              <li className='rate__option'>699</li>
              <li className='rate__option'>999</li>
              <li className='rate__option'>2990</li>
              <li className='rate__option'>5990</li>
            </ul>
            <span className='rate__sidenote'>Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц</span>
          </div>
          <div className='promo__privacy-policy'>
            <input type='checkbox' checked={privacyAccept} onChange={e => setPrivacyAccept(e.target.checked)} />
            <span>
              Я соглашаюсь с <Link to={"/"}>Правилами сервиса</Link> и условиями <Link to={"/"}>Публичной оферты.</Link>
            </span>
          </div>
          <div className='promo__checkout'>
            <button className='promo__buy-btn'>Купить</button>
            <span className='promo__buy-sidenote'>
              Нажимая «Купить», Пользователь соглашается на автоматическое списание денежных средств по истечению купленного периода. Дальнейшие
              списания по тарифам участвующим в акции осуществляются по полной стоимости согласно оферте.
            </span>
          </div>
        </div>
      </div>
      {/* {lastChance && pageRef.current && createPortal(<PromoLastСhanceModal />, pageRef.current)} */}
      {lastChance && <PromoLastСhanceModal closeModal={() => setLastChance(c => !c)} />}
    </>
  );
};
