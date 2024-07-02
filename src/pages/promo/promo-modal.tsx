import { useCallback, useMemo } from "react";
import { Modal } from "src/shared/ui/modal";
import { RateCardDiscountedMemo, TRateProps, useRateCards } from "src/entities/rate";
import { useDebug } from "src/entities/debug";

import "./promo.scss";

interface IPromoLastСhanceModalProps {
  show: boolean;
  closeModal: React.ComponentProps<typeof Modal>["closeModal"];
}

const mockModalRateOptions: Omit<TRateProps, "onSelect" | "selected">[] = [
  {
    id: "9cb876c5-9758-4215-abd6-bdeadb9f1ce4",
    name: "1 неделя",
    price: 999,
    discount: 699,
    sidenote: "Чтобы просто начать 👍🏻"
  },
  {
    id: "8cd07806-bf89-4209-9e39-d81cb68d6837",
    name: "1 месяц",
    price: 1690,
    discount: 999,
    sidenote: "Привести тело впорядок 💪🏻"
  },
  {
    id: "6aaf56d2-9854-439e-be23-fc9757e8114e",
    name: "3 месяца",
    price: 5990,
    discount: 2990,
    sidenote: "Изменить образ жизни 🔥"
  }
];
export const PromoLastСhanceModal: React.FC<IPromoLastСhanceModalProps> = ({ show, closeModal }) => {
  const { selectedCardId, selectCard } = useRateCards();
  const cb = useMemo(() => {
    return mockModalRateOptions.map(r => () => selectCard(r.id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { debug } = useDebug();
  const internalCloseModal = useCallback(debug ? () => console.log("debug close modal") : closeModal, [debug]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal show={show} closeModal={internalCloseModal} externalClassnames={["promo", "promo__last-chance"]}>
      <div onClick={internalCloseModal} className='background' />
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
          {mockModalRateOptions.map((r, idx) => (
            <li className='last-chance__card' key={r.id}>
              <RateCardDiscountedMemo
                selected={r.id === selectedCardId}
                onSelect={cb[idx]}
                price={r.price}
                name={r.name}
                discount={r.discount}
                id={r.id}
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
