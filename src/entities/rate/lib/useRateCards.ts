import { useState } from "react";
// import { TRateProps } from "src/entities/rate";

export const useRateCards = () => {
  const [selectedCardId, selectCardId] = useState<string | null>(null);
  const selectCard = (id: string) => selectCardId(prevId => (id === prevId ? null : id));
  return { selectedCardId, selectCard };
};
