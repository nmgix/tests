import classnames from "classnames";
import { IconMemo } from "src/shared/ui";

interface IBadge {
  discountPercent: number;
  externalClassnames?: string | string[];
}

export const DiscountBadge: React.FC<IBadge> = ({ discountPercent, externalClassnames }) => {
  return (
    <div className={classnames("discount-badge", externalClassnames)}>
      <IconMemo icon='star' />
      <span className='discount-badge__amount'>-{discountPercent}%</span>
    </div>
  );
};
