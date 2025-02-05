import React from "react";

export const ImageSvg: React.FC<{
  image: string | null;
  imageAlt?: string;
  imageExtStyles?: React.CSSProperties;
  imageExtClassname?: string;
  imageParams?: React.ImgHTMLAttributes<HTMLImageElement>;
  svgExtStyles?: React.CSSProperties;
  svgExtClassname?: string;
  svgParams?: React.SVGProps<SVGSVGElement>;
}> = ({
  image,
  imageAlt,
  imageExtStyles,
  imageExtClassname,
  imageParams,
  svgExtStyles,
  svgExtClassname,
  svgParams,
}) => {
  return image ? (
    <img
      src={image}
      alt={imageAlt ? imageAlt : ""}
      className={imageExtClassname ? imageExtClassname : ""}
      style={imageExtStyles ? imageExtStyles : {}}
      {...imageParams}
    />
  ) : (
    <svg
      className={svgExtClassname ? svgExtClassname : ""}
      width='100%'
      height='180'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      preserveAspectRatio='xMidYMid slice'
      focusable='false'
      style={svgExtStyles ? svgExtStyles : {}}
      {...svgParams}>
      <rect width='100%' height='100%' fill='#868e96'></rect>
    </svg>
  );
};
