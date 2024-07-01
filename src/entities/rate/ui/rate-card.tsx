import { IconMemo } from "src/shared/ui";
import { RateShortened } from "../model";
import { DiscountBadge } from "src/entities/discount/ui/badge";

import "./rate-card.scss";
import classnames from "classnames";
import { formatPrice } from "src/shared/lib/format-price";
import { memo, useCallback } from "react";

export type TRateProps = {
  discount: number;
  onSelect: (id: string) => void;
  selected: boolean;
  sidenote?: string;
  discountActive?: true;
  externalClassNames?: string | string[];
} & RateShortened;

export const RateCard: React.FC<TRateProps> = ({ name, price, sidenote, discount, discountActive, externalClassNames, onSelect, id }) => {
  const onSelectMemo = useCallback(() => onSelect(id), [onSelect, id]);

  return (
    <button onClick={onSelectMemo} className={classnames("rate-card", externalClassNames)}>
      {discountActive && <DiscountBadge price={price} discount={discount} externalClassnames={"price__discount-badge"} />}
      <div className='time-n-price'>
        <h1 className='time-course'>{name}</h1>
        {/* price wrapper есть в карточке ниже, как с неймингом быть? вроде разные классы */}
        <div className='price__wrapper'>
          <h1 className='price__tag'>{formatPrice(discountActive ? discount : price)}₽</h1>
          {discountActive && <h2 className='price__discount'>{formatPrice(price)}₽</h2>}
        </div>
      </div>
      {sidenote && <span className='rate-card__sidenote'>{sidenote}</span>}
    </button>
  );
};

export const RateCardMemo = memo(RateCard, (prev, next) => prev.selected === next.selected);

export const RateCardDiscounted: React.FC<TRateProps> = ({ onSelect, selected, name, price, discount, id }) => {
  const onSelectMemo = useCallback(() => onSelect(id), [onSelect, id]);

  return (
    // rate-discounted  костыль?
    <div className='rate-card rate-discounted'>
      <div className='time-cource__wrapper'>
        <div className='time-cource'>
          <h2 className='time-cource__title'>{name}</h2>
          {/* price-prev-костыль, мб price--prev если только, а то реюза ноль */}
          <div className='prev-price time-cource__discount'>
            <h3 className='prev-price__price'>{formatPrice(price)}₽</h3>
            <IconMemo icon='price-cross' classNames={"prev-price__discount"} />
          </div>
        </div>
        <input className='time-cource__select' onChange={onSelectMemo} checked={selected} type='radio' />
      </div>
      <hr className='rate-discounted__separation-line' />
      <div className='price__wrapper'>
        <h1 className='price__tag'>{formatPrice(discount)}₽</h1>
        <DiscountBadge price={price} discount={discount} externalClassnames={"price__discount-badge"} />
      </div>
    </div>
  );
};

export const RateCardDiscountedMemo = memo(RateCardDiscounted, (prev, next) => prev.selected === next.selected);
