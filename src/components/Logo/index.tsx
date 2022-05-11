/**
 * @param size - три типа: `s`- минимальный формат, квадратная форма, `l`- полный формат, прямоугольная форма
 * @returns изображение логотипа
 */

type LogoSizes = "s" | "l";

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
  console.log(appendClass);

  return <img className={appendClass} src='/images/spacex-logo.png' />;
};

export default Logo;
