import Image from "next/image";
import React, { useState } from "react";
import settings from "../../../settings";

enum Icons {
  "asteroid.svg",
  "dinosaur.svg",
}

enum IconSizes {
  "none",
  "xs",
  "sm",
  "m",
  "xl",
  "xxl",
  "xxxl",
}

type IconProps = {
  icon: keyof typeof Icons;
  size: keyof typeof IconSizes;
};

const Icon: React.FC<IconProps> = ({ icon, size }) => {
  let [sizeData] = useState<{
    width: number;
    height: number;
  }>(() => {
    let sizeIndex = Object.keys(IconSizes)
      .filter((s) => isNaN(Number(s)))
      .indexOf(size);

    return { width: sizeIndex * 15, height: sizeIndex * 15 };
  });

  return (
    <Image
      width={sizeData.width}
      height={sizeData.height}
      src={`${settings.assetsRoute}${icon}`}
      alt='image'
      draggable={false}
    />
  );
};

export default Icon;
