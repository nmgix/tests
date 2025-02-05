import { useCallback } from "react";

import { Rate } from "../../model";
import { TRateProps } from "../../ui";
import { sidenotes, sidenotes_sm } from "../constants/sidenotes";

export const useWrapRateProps = (selectedCardId: string | null, original_price_cards: Rate[]) => {
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

  return { createListElement, createList };
};
