import { useMemo } from "react";
import { Modal } from "src/shared/ui/modal";
import { Rate, RateCardDiscountedMemo, useRateCards } from "src/entities/rate";

import "./promo.scss";
import "./last-chance.scss";

interface IPromoLastСhanceModalProps {
  show: boolean;
  closeModal: React.ComponentProps<typeof Modal>["closeModal"];
  discounted_price_cards: Rate[];
  original_price_cards: Rate[];
}

export const PromoLastСhanceModal: React.FC<IPromoLastСhanceModalProps> = ({ show, closeModal, discounted_price_cards, original_price_cards }) => {
  const { selectedCardId, selectCard } = useRateCards();
  const default_cards_cb = useMemo(() => {
    return discounted_price_cards.map(r => () => selectCard(r.id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal label='Последний шанс начать тренироваться' show={show} closeModal={closeModal} externalClassnames={["last-chance", "promo__last-chance"]}>
      {/* <div onClick={internalCloseModal} className='background' /> */}
      <h1 className='last-chance__title'>
        Не упусти свой <mark>последний шанс</mark>
      </h1>
      <div className='last-chance__intro'>
        <h2 className='title'>
          Мы знаем, как трудно начать.. <mark>Поэтому!</mark>
        </h2>
        <h2 className='discount-doubledown'>
          <b>
            Дарим скидку для <mark>лёгкого старта</mark>
          </b>{" "}
          🏃
        </h2>
      </div>
      <div className='last-chance__offer'>
        <span className='title'>
          Посмотри, что мы для тебя приготовили <mark>🔥</mark>
        </span>
        <ul className='cards'>
          {discounted_price_cards.map((r, idx) => (
            <li className='card' key={r.id}>
              <RateCardDiscountedMemo
                selected={r.id === selectedCardId}
                onSelect={default_cards_cb[idx]}
                price={r.price}
                name={r.name}
                discount_from={original_price_cards[idx].price}
                id={r.id}
                group_name={"last-chance-cards"}
              />
            </li>
          ))}
        </ul>
      </div>
      <button className='button--primary promo__buy-btn'>Начать тренироваться</button>
    </Modal>
  );
};
