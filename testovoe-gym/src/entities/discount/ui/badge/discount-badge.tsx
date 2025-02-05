import classnames from "classnames";
import { IconMemo } from "src/shared/ui";
import "./discount-badge.scss";
import { calculateDiscount } from "src/shared/lib/discount";
import { memo } from "react";

interface IBadge {
  price: number;
  discount: number;
  externalClassnames?: string | string[];
}

export const DiscountBadge: React.FC<IBadge> = memo(
  ({ price, discount, externalClassnames }) => {
    return (
      <div className={classnames("discount-badge", externalClassnames)}>
        <IconMemo icon='star' />
        <span className='discount-badge__amount'>-{calculateDiscount(price, discount)}%</span>
      </div>
    );
  },
  (prev, next) => prev.discount === next.discount
);
