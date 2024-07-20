import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { RateCardMemo, usePriceCards } from "src/entities/rate";
import { useAction, useAppSelector } from "src/shared/lib/hooks/redux";
import { fillArr } from "src/shared/lib/fillArray";
import { PromoLastСhanceModal } from "./promo-modal";
import { useDebug } from "src/entities/debug";
import { ImageMemo } from "src/shared/ui/image";

import { useAnimateCards } from "src/entities/rate/lib/hooks/useAnimateCards";
import "./promo.scss";

const usePromoDebug = () => {
  const { debug, toggleDebug } = useDebug(); // дебаг контекст
  const [internalDebug, setInternalDebug] = useState({
    skeletonList: false, // дебаг для анимаций skeleton загрузки тарифов
    hideModal: false // не показывать модалку при достижении таймера
  });

  const debugModal = debug && (
    <div className='debug-window'>
      <input
        id='debug-skeleton-loader'
        type='checkbox'
        onChange={() => setInternalDebug(prev => ({ ...prev, skeletonList: !prev.skeletonList }))}
        checked={internalDebug.skeletonList}
      />
      <label htmlFor='debug-skeleton-loader'>skeleton loader</label>

      <input
        id='debug-hide-modal'
        type='checkbox'
        onChange={() => setInternalDebug(prev => ({ ...prev, hideModal: !prev.hideModal }))}
        checked={internalDebug.hideModal}
      />
      <label htmlFor='debug-hide-modal'>hide modal</label>

      <button onClick={toggleDebug}>переключить debug режим</button>
    </div>
  );

  return { vars: { debug, internalDebug }, functions: { toggleDebug }, components: { debugModal } };
};

export const PromoPage = () => {
  const { lastChanceActive, discountActive } = useAppSelector(s => s.discount); // стейт скидки, при discountActive=false вызывается useGSAP с анимациями, lastChanceActive отвечает за рендер модалки
  const { changeDiscount, fetchRates } = useAction(); // экшены из стейта

  const {
    vars: promoDebugVars,
    components: { debugModal }
  } = usePromoDebug();

  const rates = useAppSelector(s => s.rate); // все карточки с апи в стейте
  useLayoutEffect(() => {
    fetchRates(); // получение карточек с апи и добавление их в стейт через extraReducers
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { cards, lists, functions, vars } = usePriceCards(rates, promoDebugVars.internalDebug.skeletonList);
  const [privacyAccept, setPrivacyAccept] = useState(false); // можно было бы это всё через react-hook-form
  const highlightBtnActive = privacyAccept === true && vars.selectedCardId !== null; // проверка что выбрана карточка и согласие с правилами.. ..оферты

  const listRef = useRef<HTMLUListElement>(null); // для анимации при сбросе скидок
  useAnimateCards(listRef, discountActive, functions); // анимация карточек

  const onSelectLastChance = (selectedCardId: string | null) => {
    changeDiscount({ lastChance: false });

    if (typeof selectedCardId === "string") {
      return console.log("выбрана карточка " + selectedCardId);
    } else {
      return console.log("карточка не выбрана");
    }
  };

  return (
    <>
      {debugModal}
      <div className='promo__wrapper'>
        <div className='page promo' id='promo'>
          <h1 className='promo__title'>Выберите подходящий тарифный план</h1>
          <div className='promo__content'>
            <div className='image__wrapper'>
              <div className='image__effect'>
                <ImageMemo
                  path='/assets/images/to_be_2.webp'
                  alt='накачанный мужчина'
                  externalConditions={!promoDebugVars.internalDebug.skeletonList}
                />
              </div>
            </div>
            <div className='promo__info'>
              <div className='rate__wrapper'>
                <ul ref={listRef} className='rate__options'>
                  {rates &&
                    fillArr(4, null).map((_, idx) => (
                      <li className='rate__option' key={idx}>
                        {lists.discountedList[idx] === undefined || lists.originalList[idx] === null ? (
                          <Skeleton key={idx} />
                        ) : (
                          <div className='rate__card-animation'>
                            <RateCardMemo {...lists.discountedList[idx]!} />
                            <RateCardMemo {...lists.originalList[idx]!} />
                          </div>
                        )}
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
        show={lastChanceActive && !promoDebugVars.internalDebug.hideModal}
        closeModal={() => changeDiscount({ lastChance: false })}
        discounted_price_cards={cards.modal_discounted_price_cards}
        original_price_cards={cards.original_price_cards}
        callback={onSelectLastChance}
      />
    </>
  );
};
