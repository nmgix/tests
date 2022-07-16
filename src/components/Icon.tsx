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
  color: string;
  size: { width: string; height: string };
  opacity?: number;
}> = ({ icon, color, size, opacity = 1 }) => {
  console.log();

  return (
    <>
      <svg className={`icon icon-${icon}`} fill={color} width={size.width} height={size.height} opacity={opacity}>
        <use xlinkHref={`${IconsSprite}#icon-${icon}`} />
      </svg>
    </>
  );
};
