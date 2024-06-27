import classnames from "classnames";
import { IconMemo } from "src/shared/ui";
import "./discount-badge.scss";
import { calculateDiscount } from "src/shared/lib/discount";

interface IBadge {
  // discountPercent: number;
  price: number;
  discount: number;
  externalClassnames?: string | string[];
}

export const DiscountBadge: React.FC<IBadge> = ({ price, discount, externalClassnames }) => {
  return (
    <div className={classnames("discount-badge", externalClassnames)}>
      <IconMemo icon='star' />
      <span className='discount-badge__amount'>-{calculateDiscount(price, discount)}%</span>
    </div>
  );
};
