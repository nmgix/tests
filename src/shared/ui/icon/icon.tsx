import classnames from "classnames";
import { memo } from "react";
import "./icon.scss";

enum AvailableIcons {
  "error-sign"
}

interface IIconProps {
  icon: keyof typeof AvailableIcons;
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
