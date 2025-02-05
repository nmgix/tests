import LoaderSpinner from "@resources/loader-spinner.gif";
import "./_loader.scss";

/**
 * Элемент Загрузка. Заглушка для показа покаподгружается основная информация.
 *
 * @returns {React.FC} Функциональный компонент.
 */
export const Loader = () => {
  return (
    <div className='loader'>
      <img src={LoaderSpinner} alt='loader' />
    </div>
  );
};
