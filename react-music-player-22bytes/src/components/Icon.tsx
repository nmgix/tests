import React from "react";
import IconsSprite from "../resources/icons.svg";

enum Icons {
  "arrow-down",
  "arrow-up",
  "fallback-cover",
  "pause",
  "play",
  "shuffle",
  "skip-backward",
  "skip-forward",
  "sort",
}

export const Icon: React.FC<{
  icon: keyof typeof Icons;
  size: { width: string; height: string };
  color?: string;
  opacity?: number;
  classnames?: string[];
}> = ({ icon, color, size, opacity = 1, classnames }) => {
  return (
    <>
      <svg
        className={`icon icon-${icon} ${classnames ? classnames.join(" ") : ""}`}
        fill={color ? color : undefined}
        width={size.width}
        height={size.height}
        opacity={opacity}>
        <use xlinkHref={`${IconsSprite}#icon-${icon}`} />
      </svg>
    </>
  );
};
