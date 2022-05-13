import "./_logo.scss";
type LogoSizes = "s" | "l";

/**
 * @param size - три типа: `s`- минимальный формат, квадратная форма, `l`- полный формат, прямоугольная форма
 * @returns изображение логотипа
 */
const Logo: React.FC<{ size: LogoSizes }> = ({ size }) => {
  const appendClass = (function (size: LogoSizes) {
    switch (size) {
      case "s": {
        return "logo-small";
      }
      case "l":
      default: {
        return "logo-large";
      }
    }
  })(size);

  return (
    <div className={`${appendClass} borders corners`}>
      <img src='/images/spacex-logo.png' alt='space-logo' />
    </div>
  );
};

export default Logo;
