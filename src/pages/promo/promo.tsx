import { useLayoutEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import { RateCardMemo, useRateCards } from "src/entities/rate";
import { useAction, useAppSelector } from "src/shared/lib/hooks/redux";

import { PromoLastСhanceModal } from "./promo-modal";

import "./promo.scss";

export const PromoPage = () => {
  const { lastChanceActive, discountActive } = useAppSelector(s => s.discount);
  const { changeLastChanceState, fetchRates } = useAction();

  const [privacyAccept, setPrivacyAccept] = useState(false);
  const { selectedCardId, selectCard } = useRateCards();
  const highlightBtnActive = privacyAccept === true && selectedCardId !== null;

  const rates = useAppSelector(s => s.rate);
  useLayoutEffect(() => {
    fetchRates();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const default_cards_cb = useMemo(() => {
    return rates.map(r => () => selectCard(r.id));
  }, [rates]); // eslint-disable-line react-hooks/exhaustive-deps

  const discounted_price_cards = rates.slice(0, 4);
  const original_price_cards = rates.slice(4, 8);
  const modal_discounted_price_cards = rates.slice(8, 11);

  return (
    <>
      <div className='promo__wrapper'>
        <div className='page promo' id='promo'>
          <h1 className='promo__title'>Выберите подходящий тарифный план</h1>
          <div className='promo__content'>
            <div className='image__wrapper'>
              <div className='image__effect'>
                <img className='image' draggable='false' src='/assets/images/to_be_2.png' alt='накачанный мужчина' />
              </div>
            </div>
            <div className='promo__info'>
              <div className='rate__wrapper'>
                <ul className='rate__options'>
                  {discountActive
                    ? discounted_price_cards.map((r, idx) => (
                        <li className='rate__option' key={r.id}>
                          <RateCardMemo
                            discount_from={original_price_cards[idx].price}
                            {...r}
                            onSelect={default_cards_cb[idx]}
                            selected={r.id === selectedCardId}
                          />
                        </li>
                      ))
                    : original_price_cards.map((r, idx) => (
                        <li className='rate__option' key={r.id}>
                          <RateCardMemo {...r} onSelect={default_cards_cb[idx]} selected={r.id === selectedCardId} />
                        </li>
                      ))}
                </ul>
                <span className='rate__sidenote'>Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц</span>
              </div>
              <div className='promo__privacy-policy'>
                <input
                  id='privacy-policy'
                  className='privacy-policy__input'
                  type='checkbox'
                  checked={privacyAccept}
                  onChange={e => setPrivacyAccept(e.target.checked)}
                />
                <label htmlFor='privacy-policy' className='privacy-policy__description'>
                  Я соглашаюсь с{" "}
                  <Link className='privacy-policy__link' to={"/"}>
                    правилами сервиса
                  </Link>{" "}
                  и условиями{" "}
                  <Link className='privacy-policy__link' to={"/"}>
                    публичной оферты.
                  </Link>
                </label>
              </div>
              <div className='promo__checkout'>
                <button className={classnames("button--primary checkout__btn", { "checkout__btn--highlighted": highlightBtnActive })}>Купить</button>
                <span className='checkout__sidenote'>
                  Нажимая «Купить», Пользователь соглашается на автоматическое списание денежных средств по истечению купленного периода. Дальнейшие
                  списания по тарифам участвующим в акции осуществляются по полной стоимости согласно оферте.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PromoLastСhanceModal
        show={lastChanceActive}
        closeModal={() => changeLastChanceState({ active: false })}
        discounted_price_cards={modal_discounted_price_cards}
        original_price_cards={original_price_cards}
      />
    </>
  );
};
