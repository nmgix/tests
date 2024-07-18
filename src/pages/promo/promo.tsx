import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Rate, RateCardMemo, TRateProps, useRateCards } from "src/entities/rate";
import { useAction, useAppSelector } from "src/shared/lib/hooks/redux";
import { fillArr } from "src/shared/lib/fillArray";

import { PromoLastСhanceModal } from "./promo-modal";

import "./promo.scss";
import { Breakpoints } from "src/shared/types/breakpoints";
import { useDebug } from "src/entities/debug";

const sidenotes = [
  "Чтобы просто начать 👍🏻",
  "Привести тело впорядок 💪🏻",
  "Изменить образ жизни 🔥",
  "Всегда быть в форме и поддерживать своё здоровье ⭐️"
];
const sidenotes_sm = [undefined, undefined, undefined, "Всегда быть в форме ⭐️"];

export const PromoPage = () => {
  const { lastChanceActive, discountActive } = useAppSelector(s => s.discount); // стейт скидки, при discountActive=false вызывается useGSAP с анимациями, lastChanceActive отвечает за рендер модалки
  const { changeDiscount, fetchRates } = useAction(); // экшены из стейта
  const { debug } = useDebug(); // дебаг контекст
  // const [skeletonList, setSkeletonList] = useState(false); // дебаг скелетон загрузки, ипнут в хедере при debug=true
  // const [hideModal, setHideModal] = useState(false); // дебаг модалки, ипнут в хедере при debug=true

  const [internalDebug, setInternalDebug] = useState({
    skeletonList: false, // дебаг для анимаций skeleton загрузки тарифов
    hideModal: false // не показывать модалку при достижении таймера
  });

  const { selectedCardId, selectCard } = useRateCards(); // реюз хука есть в модалке
  const [privacyAccept, setPrivacyAccept] = useState(false); // можно было бы это всё через react-hook-form
  const highlightBtnActive = privacyAccept === true && selectedCardId !== null; // проверка что выбрана карточка и согласие с правилами.. ..оферты

  const rates = useAppSelector(s => s.rate); // все карточки с апи в стейте
  useLayoutEffect(() => {
    fetchRates(); // получение карточек с апи и добавление их в стейт через extraReducers
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const discounted_price_cards = useMemo(() => rates.slice(0, 4), [rates]); // карточки с скидками (дефолт)
  const original_price_cards = useMemo(() => rates.slice(4, 8), [rates]); // карточки без скидок
  const modal_discounted_price_cards = useMemo(
    () => (!internalDebug.skeletonList ? rates.slice(8, 11) : fillArr(3, undefined)),
    [rates, internalDebug]
  ); // карточки для модалки

  const createListElement = useCallback(
    (el: Rate, idx: number, onSelect: () => void, discounted: boolean) => {
      return {
        ...el,
        onSelect,
        selected: el.id === selectedCardId,
        discount_from: discounted ? original_price_cards[idx].price : undefined,
        sidenote: sidenotes[idx],
        sidenote_sm: sidenotes_sm[idx]
      } as unknown as TRateProps;
    },
    [original_price_cards, selectedCardId]
  ); // обёртка карточек с апи в пропсы рендер-компонентов
  const createList = useCallback(
    (list: Rate[], onSelect: (() => void)[], discounted: boolean) => {
      return list.map((c, idx) => createListElement(c, idx, onSelect[idx], discounted));
    },
    [createListElement]
  );

  const discounted_cards_cb = useMemo(() => {
    return discounted_price_cards.map(r => () => selectCard(r.id));
  }, [rates]); // eslint-disable-line react-hooks/exhaustive-deps
  const discountedList = useMemo(
    () => (!internalDebug.skeletonList ? createList(discounted_price_cards, discounted_cards_cb, true) : fillArr(4, undefined)),
    [discounted_price_cards, createList, discounted_cards_cb, internalDebug]
  );

  const original_cards_cb = useMemo(() => {
    return original_price_cards.map(r => () => selectCard(r.id));
  }, [rates]); // eslint-disable-line react-hooks/exhaustive-deps
  const originalList = useMemo(
    () => (!internalDebug.skeletonList ? createList(original_price_cards, original_cards_cb, false) : fillArr(4, undefined)),
    [original_price_cards, createList, original_cards_cb, internalDebug]
  );

  const listRef = useRef<HTMLUListElement>(null); // для анимации при сбросе скидок

  useGSAP(
    () => {
      const _nodes = listRef.current?.querySelectorAll(".rate__option");
      const nodes = [..._nodes!];
      const firstRow = nodes.slice(0, 3);
      const secondRow = nodes[3];

      const reverseAnimateCard = (element: Element) => {
        const card = element.firstElementChild;
        if (!card) return console.log("reverse-animation failed");
        const internalCards = card?.querySelectorAll(".rate-card");
        if (!internalCards) return;
        const discountBadge = internalCards.item(0)?.querySelector(".discount-badge") as HTMLDivElement;
        if (!discountBadge) return;

        setTimeout(() => {
          discountBadge.style["transform"] = "revert-layer";
          (internalCards.item(0) as HTMLDivElement).style["display"] = "flex";
          (internalCards.item(1) as HTMLDivElement).style["display"] = "none";
          (internalCards.item(1) as HTMLDivElement).style["position"] = "absolute";
          (card as HTMLDivElement).style["transform"] = "none";
        }, 0);
      };

      const animateCard = (element: Element, direction: "horizontal" | "vertical", delay?: number) => {
        const cardTL = gsap.timeline();
        const card = element.firstElementChild;
        if (!card) return console.log("Animation failed");
        const internalCards = card?.querySelectorAll(".rate-card");
        if (!internalCards) return;
        const discountBadge = internalCards.item(0)?.querySelector(".discount-badge");
        if (!discountBadge) return;
        const discountTL = gsap.timeline();

        const horizontal1Config: gsap.TweenVars = {
          duration: 1,
          rotateY: 90,
          ease: "elastic.in",
          onComplete: () => {
            (internalCards.item(0) as HTMLDivElement).style["display"] = "none";
            (internalCards.item(1) as HTMLDivElement).style["display"] = "flex";
            (internalCards.item(1) as HTMLDivElement).style["position"] = "relative";
          },
          delay
        };
        const horizontal2Config: gsap.TweenVars = {
          duration: 1,
          ease: "elastic.out",
          rotateY: 180
        };

        const vertical1Config: gsap.TweenVars = {
          duration: 1,
          rotateX: 90,
          ease: "elastic.in",
          onComplete: () => {
            (internalCards.item(0) as HTMLDivElement).style["display"] = "none";
            (internalCards.item(1) as HTMLDivElement).style["display"] = "flex";
            (internalCards.item(1) as HTMLDivElement).style["position"] = "relative";
            (internalCards.item(1) as HTMLDivElement).style["transform"] = "rotateX(180deg)";
          },
          delay
        };
        const vertical2Config: gsap.TweenVars = {
          duration: 1,
          ease: "elastic.out",
          rotateX: 180
        };

        cardTL
          .to(card, direction === "horizontal" ? horizontal1Config : vertical1Config)
          .to(card, direction === "horizontal" ? horizontal2Config : vertical2Config);

        discountTL
          .to(discountBadge, {
            delay: delay ? delay + 1 : 1,
            duration: 0.1,
            translateY: 40,
            ease: "elastic.in"
          })
          .clear(true);
      };

      if (discountActive) {
        // откат стилей (не рабоотает если преключить timer-time во время анимации (onInterrupt не помогает))
        nodes?.forEach(el => {
          reverseAnimateCard(el);
        });

        selectCard(null);
        return;
      } else {
        // где сама анимация вызывается
        firstRow?.forEach((el, idx) => {
          animateCard(el, "horizontal", idx * 0.1);
        });
        animateCard(secondRow, window.innerWidth <= Breakpoints["md-custom"] ? "horizontal" : "vertical", 0.4);
        selectCard(null);
      }
    },
    { dependencies: [discountActive, listRef.current], scope: listRef }
  ); // анимация карточек

  return (
    <>
      {debug && (
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
        </div>
      )}
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
                  {rates &&
                    fillArr(4, null).map((_, idx) => (
                      <li className='rate__option' key={idx}>
                        {discountedList[idx] === undefined || originalList[idx] === null ? (
                          <Skeleton key={idx} />
                        ) : (
                          <div className='rate__card-animation'>
                            <RateCardMemo {...discountedList[idx]!} />
                            <RateCardMemo {...originalList[idx]!} />
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
        show={lastChanceActive && !internalDebug.hideModal}
        closeModal={() => changeDiscount({ lastChance: false })}
        discounted_price_cards={modal_discounted_price_cards}
        original_price_cards={original_price_cards}
      />
    </>
  );
};
