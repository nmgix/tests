import "./_logo.scss";

import logoImage from "../../images/spacex-logo.png";

type LogoSizes = "s" | "m" | "l";

/**
 * @param size - три типа: `s`- минимальный формат, квадратная форма, `l`- полный формат, прямоугольная форма
 * @returns изображение логотипа
 */
const Logo: React.FC<{ size: LogoSizes; onClick?: () => void }> = ({ size, onClick }) => {
  const appendClass = (function (size: LogoSizes) {
    switch (size) {
      case "s": {
        return "logo-small";
      }
      case "m": {
        return "logo-medium";
      }
      case "l":
      default: {
        return "logo-large";
      }
    }
  })(size);

  return (
    <div className={`${appendClass} borders corners`} onClick={onClick}>
      <img src={logoImage} alt='space-logo' />
    </div>
  );
};

export default Logo;
