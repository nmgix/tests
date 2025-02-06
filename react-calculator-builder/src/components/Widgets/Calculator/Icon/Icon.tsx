import classNames from "classnames";

const iconPath = process.env.PUBLIC_URL + "/icons.svg";

type IconProps = { name: string; stroke: string; size: string; externalClassnames?: string };

export const Icon: React.FC<IconProps> = ({ name, stroke, size, externalClassnames }) => (
  <svg
    className={classNames(`icon icon-${name}`, externalClassnames)}
    stroke={stroke}
    fill={stroke}
    width={size}
    height={size}>
    <use xlinkHref={`${iconPath}#${name}`} />
  </svg>
);
