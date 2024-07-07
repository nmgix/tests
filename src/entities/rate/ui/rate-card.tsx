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
  discountActive?: boolean;
  externalClassNames?: string | string[];
} & RateShortened;

const RateCard: React.FC<TRateProps> = ({ name, price, sidenote, discount, discountActive, externalClassNames, onSelect, id, selected }) => {
  const onSelectMemo = useCallback(() => onSelect(id), [onSelect, id]);

  return (
    <button onClick={onSelectMemo} className={classnames("rate-card", { "rate-card--selected": selected }, externalClassNames)}>
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

type RateCardDiscountedProps = { group_name: string } & TRateProps;

const RateCardDiscounted: React.FC<RateCardDiscountedProps> = ({ onSelect, selected, name, price, discount, id, group_name }) => {
  const onSelectMemo = useCallback(() => onSelect(id), [onSelect, id]);

  return (
    <label className='rate-card'>
      <div className='time-cource__wrapper'>
        <div className='time-cource'>
          <h2 className='time-cource__title'>{name}</h2>
          {/* price-prev-костыль, мб price--prev если только, а то реюза ноль */}
          <div className='prev-price time-cource__discount'>
            <h3 className='prev-price__price'>{formatPrice(price)}Р</h3>
            <IconMemo icon='price-cross' classNames={"prev-price__discount"} />
          </div>
        </div>
        <input name={group_name} className='time-cource__select' onChange={onSelectMemo} checked={selected} type='radio' />
      </div>
      <hr className='separation-line' />
      <div className='price__wrapper'>
        <h1 className='price__tag'>{formatPrice(discount)}₽</h1>
        <DiscountBadge price={price} discount={discount} externalClassnames={"price__discount-badge"} />
      </div>
    </label>
  );
};

export const RateCardDiscountedMemo = memo(RateCardDiscounted, (prev, next) => prev.selected === next.selected);
