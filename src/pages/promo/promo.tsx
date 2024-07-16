import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Rate, RateCardMemo, TRateProps, useRateCards } from "src/entities/rate";
import { useAction, useAppSelector } from "src/shared/lib/hooks/redux";

// import { PromoLastСhanceModal } from "./promo-modal";

import "./promo.scss";
import { createRoot } from "react-dom/client";

const sidenotes = [
  "Чтобы просто начать 👍🏻",
  "Привести тело впорядок 💪🏻",
  "Изменить образ жизни 🔥",
  "Всегда быть в форме и поддерживать своё здоровье ⭐️"
];
const sidenotes_sm = [undefined, undefined, undefined, "Всегда быть в форме ⭐️"];

export const PromoPage = () => {
  const { /*lastChanceActive,*/ discountActive } = useAppSelector(s => s.discount);
  const { /*changeDiscount,*/ fetchRates } = useAction();

  const { selectedCardId, selectCard } = useRateCards();
  const [privacyAccept, setPrivacyAccept] = useState(false);
  const highlightBtnActive = privacyAccept === true && selectedCardId !== null;

  const createListElement = (el: Rate, idx: number, onSelect: () => void, discounted: boolean) => {
    return {
      ...el,
      onSelect,
      selected: el.id === selectedCardId,
      discount_from: discounted ? original_price_cards[idx].price : undefined,
      sidenote: sidenotes[idx],
      sidenote_sm: sidenotes_sm[idx]
    } as unknown as TRateProps;
  };

  const createList = (list: Rate[], onSelect: (() => void)[], discounted: boolean) => {
    return list.map((c, idx) => createListElement(c, idx, onSelect[idx], discounted));
  };
  const rates = useAppSelector(s => s.rate);
  useLayoutEffect(() => {
    fetchRates();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const discounted_price_cards = rates.slice(0, 4);
  const original_price_cards = rates.slice(4, 8);
  // const modal_discounted_price_cards = rates.slice(8, 11);

  const discounted_cards_cb = useMemo(() => {
    return discounted_price_cards.map(r => () => selectCard(r.id));
  }, [rates]); // eslint-disable-line react-hooks/exhaustive-deps
  const original_cards_cb = useMemo(() => {
    return original_price_cards.map(r => () => selectCard(r.id));
  }, [rates]); // eslint-disable-line react-hooks/exhaustive-deps

  const listRef = useRef<HTMLUListElement>(null);
  const flippersRef = useRef<(HTMLLIElement | null)[]>([]);
  // const currentList = useRef(discounted_price_cards);

  useGSAP(
    () => {
      if (discountActive) return;

      const nodes = listRef.current?.querySelectorAll(".rate__option");
      const discountedList = createList(discounted_price_cards, discounted_cards_cb, true);
      const originalList = createList(original_price_cards, original_cards_cb, false);
      nodes?.forEach((el, idx) => {
        createRoot(el).render(
          <div className='rate__card-animation'>
            <RateCardMemo {...discountedList[idx]} />
            <RateCardMemo {...originalList[idx]} />
          </div>
        );
      });

      nodes?.forEach(el => {
        const cardTL = gsap.timeline();
        const cards = el.firstElementChild;
        console.log(cards);
        if (!cards) return console.log("Animation failed");
        const internalCards = cards.querySelectorAll(".rate-card");
        // const discountBadge = internalCards.item(0).querySelector(".discount-badge");
        // const discountTL = gsap.timeline();

        cardTL
          .to(cards, {
            duration: 1,
            rotateY: 90,
            onComplete: () => {
              (internalCards.item(0) as HTMLDivElement).style["zIndex"] = "0";
            }
          })
          .to(cards, {
            duration: 1,
            rotateY: 180
          });

        // discountTL.to(discountBadge, {
        //   delay: 0.3,
        //   duration: 0.7,
        //   translateY: 40
        // });
      });

      // listData.current.forEach((_, i) => {
      //   const cardTL = gsap.timeline();
      //   const currentCard = flippersRef.current[i];
      //   if (!currentCard) return;
      // const discountBadge = currentCard.querySelector(".discount-badge");
      // const discountTL = gsap.timeline();
      //   const backface = currentCard.querySelector(".backface");
      //   const backfaceTL = gsap.timeline();

      //   cardTL.to(currentCard, {
      //     duration: 1,
      //     rotateY: 180
      //     // onComplete: () => {
      //     //   // setCurrentList(prev => prev.map((el, idx) => (idx === i ? original_price_cards[i] : el)));

      //     //   // currentCard = <div></div>
      //     //   // currentCard = createElement(RateCardMemo)
      //     // },
      //   });
      //   // .add(() => {
      //   //   listData.current[i] = createListElement(original_price_cards[i], i, original_cards_cb[i]);
      //   //   forceUpdate();
      //   // })
      //   // .to(currentCard, {
      //   //   duration: 1,
      //   //   rotationY: 360
      //   // });
      //   // backfaceTL
      //   //   .to(backface, {
      //   //     duration: 0,
      //   //     rotateY: 180
      //   //   })
      //   //   .to(backface, {
      //   //     duration: 0.6,
      //   //     rotateY: 360
      //   //   });

      // discountTL.to(discountBadge, {
      //   delay: 0.3,
      //   duration: 0.7,
      //   translateY: 40
      // });
      // });
    },
    { dependencies: [discountActive], scope: listRef }
  );

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
                <ul ref={listRef} className='rate__options'>
                  {/* {currentList.current.map((r, idx) => (
                    <li className='rate__option' key={r.id} ref={el => (flippersRef.current[idx] = el)}>
                      <RateCardMemo
                        discount_from={original_price_cards[idx].price}
                        {...r}
                        onSelect={discounted_cards_cb[idx]}
                        selected={r.id === selectedCardId}
                        sidenote={sidenotes[idx]}
                        sidenote_sm={sidenotes_sm[idx]}
                      />
                    </li>
                  ))} */}
                  {createList(discounted_price_cards, discounted_cards_cb, true).map((r, idx) => (
                    <li className='rate__option' key={r?.id ?? idx} ref={el => (flippersRef.current[idx] = el)}>
                      {r !== null ? <RateCardMemo {...r} /> : <Skeleton />}
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
      {/* <PromoLastСhanceModal
        show={lastChanceActive}
        closeModal={() => changeDiscount({ lastChance: false })}
        discounted_price_cards={modal_discounted_price_cards}
        original_price_cards={original_price_cards}
      /> */}
    </>
  );
};
