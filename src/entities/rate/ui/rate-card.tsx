import { IconMemo } from "src/shared/ui";
import { RateShortened } from "../model";
import { DiscountBadge } from "src/entities/discount/ui/badge";
import { calculateDiscount } from "src/shared/lib/discount";

import "./rate-card.scss";

type TRateProps = { sidenote?: string } & RateShortened;

export const RateCard: React.FC<TRateProps> = ({ name, price, sidenote }) => {
  return (
    <div className='rate-card'>
      <h1 className='time-course'>{name}</h1>
      <h1 className='price'>{price}₽</h1>
      {sidenote && <span className='rate__sidenote'>{sidenote}</span>}
    </div>
  );
};

type TRateDiscountedProps = { onInputSelect: () => void; cardSelected: boolean; prevPrice: number } & Omit<TRateProps, "sidenote">;
export const RateCardDiscounted: React.FC<TRateDiscountedProps> = ({ onInputSelect, cardSelected, name, price, prevPrice }) => {
  return (
    <div className='rate-card rate-discounted'>
      <div className='time-cource__wrapper'>
        <div className='time-cource'>
          <h2 className='time-cource__title'>{name}</h2>
          <div className='prev-price time-cource__discount'>
            <h3 className='prev-price__price'>{prevPrice}₽</h3>
            <IconMemo icon='price-cross' classNames={"prev-price__discount"} />
          </div>
        </div>
        <input className='time-cource__select' onChange={onInputSelect} checked={cardSelected} type='radio' />
      </div>
      <hr className='rate-discounted__separation-line' />
      <div className='price__wrapper'>
        <h1 className='price'>{price}₽</h1>
        <DiscountBadge discountPercent={calculateDiscount(prevPrice, price)} externalClassnames={"price__discount"} />
      </div>
    </div>
  );
};
