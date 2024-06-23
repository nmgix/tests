import { CountdownTimer } from "src/shared/ui";
import "./discount-header.scss";

export const DiscountHeader: React.FC = () => {
  const timerUntil = new Date();

  return (
    <div className='discount-header'>
      <h2 className='discount-header__title'>Скидка действует:</h2>
      <CountdownTimer timeUntilExpire={timerUntil} />
    </div>
  );
};
