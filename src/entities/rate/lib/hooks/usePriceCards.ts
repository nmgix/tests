import { useMemo } from "react";
import { IRateState } from "../../model";
import { fillArr } from "src/shared/lib/fillArray";
import { useWrapRateProps } from "./useWrapRateProps";
import { useRateCards } from "../useRateCards";

export const usePriceCards = (rates: IRateState, skeleton: boolean) => {
  const discounted_price_cards = useMemo(() => rates.slice(0, 4), [rates]); // карточки с скидками (дефолт)
  const original_price_cards = useMemo(() => rates.slice(4, 8), [rates]); // карточки без скидок
  const modal_discounted_price_cards = useMemo(() => (!skeleton ? rates.slice(8, 11) : fillArr(3, undefined)), [rates, skeleton]); // карточки для модалки
  const { selectedCardId, selectCard } = useRateCards(); // реюз хука есть в модалке
  const { createList, createListElement } = useWrapRateProps(selectedCardId, original_price_cards);

  const discounted_cards_cb = useMemo(() => {
    return discounted_price_cards.map(r => () => selectCard(r.id));
  }, [rates]); // eslint-disable-line react-hooks/exhaustive-deps
  const discountedList = useMemo(
    () => (!skeleton ? createList(discounted_price_cards, discounted_cards_cb, true) : fillArr(4, undefined)),
    [discounted_price_cards, createList, discounted_cards_cb, skeleton]
  );

  const original_cards_cb = useMemo(() => {
    return original_price_cards.map(r => () => selectCard(r.id));
  }, [rates]); // eslint-disable-line react-hooks/exhaustive-deps
  const originalList = useMemo(
    () => (!skeleton ? createList(original_price_cards, original_cards_cb, false) : fillArr(4, undefined)),
    [original_price_cards, createList, original_cards_cb, skeleton]
  );

  return {
    cards: { discounted_price_cards, original_price_cards, modal_discounted_price_cards },
    lists: { discountedList, originalList },
    functions: { createList, createListElement, selectCard },
    vars: { selectedCardId }
  };
};
