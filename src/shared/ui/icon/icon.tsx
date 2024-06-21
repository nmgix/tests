import classnames from "classnames";
import { memo } from "react";

enum AvailableIcons {
  "error-sign"
}

interface IIconProps {
  /**
   * Choose between available icons located at public/svg
   */
  icon: keyof typeof AvailableIcons;
  /**
   * background color for icon, set in `element.style`
   * @optional
   */
  color?: string;
  classNames?: string | string[];
}

export const Icon: React.FC<IIconProps> = ({ icon, color, classNames }) => {
  return (
    <svg className={classnames("icon", classNames)} style={{ color }}>
      {/* <title>??? */}
      <use xlinkHref={`/icons/svg/index.svg#${icon}`}></use>
    </svg>
  );
};
Icon.displayName = "Icon";

export const IconMemo = memo(Icon, (prev, next) => prev.icon === next.icon && prev.color === next.color);
IconMemo.displayName = "IconMemo";
