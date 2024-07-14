import { RateShortened } from "../model";
import { DiscountBadge } from "src/entities/discount/ui/badge";

import classnames from "classnames";
import { formatPrice } from "src/shared/lib/format-price";
import { memo, useCallback, useId } from "react";

import "./rate-card.scss";
import classNames from "classnames";

export type TRateProps = {
  onSelect: (id: string) => void;
  selected: boolean;
  discount_from?: number;
  sidenote?: string;
  sidenote_sm?: string; // ради "Всегда быть в форме" в мобильной версии
  externalClassNames?: string | string[];
} & RateShortened;

const RateCard: React.FC<TRateProps> = ({ name, price, sidenote, sidenote_sm, discount_from, externalClassNames, onSelect, id, selected }) => {
  const onSelectMemo = useCallback(() => onSelect(id), [onSelect, id]);

  return (
    <button onClick={onSelectMemo} className={classnames("rate-card", { "rate-card--selected": selected }, externalClassNames)}>
      {discount_from && <DiscountBadge price={price} discount={discount_from} externalClassnames={"price__discount-badge"} />}
      <div className='time-n-price'>
        <h1 className='time-course'>{name}</h1>
        <div className='price__wrapper'>
          <h1 className='price__tag'>{formatPrice(price)}₽</h1>
          {discount_from && <h2 className='price__discount'>{formatPrice(discount_from)}₽</h2>}
        </div>
      </div>
      {sidenote && <span className='rate-card__sidenote'>{sidenote}</span>}
      {sidenote_sm && <span className='rate-card__sidenote--small'>{sidenote_sm}</span>}
    </button>
  );
};

export const RateCardMemo = memo(RateCard, (prev, next) => prev.selected === next.selected && prev.id === next.id);

type RateCardDiscountedProps = { group_name: string } & TRateProps;

const RateCardDiscounted: React.FC<RateCardDiscountedProps & { discount_from: number }> = ({
  onSelect,
  selected,
  name,
  price,
  discount_from,
  id,
  group_name
}) => {
  const inputId = useId();
  const internalOnSelect = useCallback(() => onSelect(id), [id, onSelect]);

  return (
    <button onClick={internalOnSelect} className={classNames("rate-card rate-card--discounted", { "rate-card--selected": selected })}>
      <div className='time-cource__wrapper'>
        <div className='time-cource'>
          <h2 className='time-cource__title'>{name}</h2>
          <div className='prev-price time-cource__discount'>
            <h3 className='prev-price__price'>{formatPrice(discount_from)}Р</h3>
          </div>
        </div>
        <input id={"time-cource-select" + inputId} name={group_name} className='time-cource__select' disabled checked={selected} type='radio' />
        <label htmlFor={"time-cource-select" + inputId}></label>
      </div>
      <hr className='separation-line' />
      <div className='price__wrapper'>
        <h1 className='price__tag'>{formatPrice(price)}₽</h1>
        <DiscountBadge price={price} discount={discount_from} externalClassnames={"price__discount-badge"} />
      </div>
    </button>
  );
};

export const RateCardDiscountedMemo = memo(RateCardDiscounted, (prev, next) => prev.selected === next.selected && prev.id === next.id);
