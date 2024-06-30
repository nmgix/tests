import { CountdownTimer } from "src/shared/ui";
import "./discount-header.scss";

export const DiscountHeader: React.FC = () => {
  const debugMode = false; //из глобал стейта брать
  const timerUntil = new Date(debugMode ? Date.now() + 35000 : Date.now() + 60000 * 2);

  return (
    <div className='discount-header'>
      <h2 className='discount-header__title'>Скидка действует:</h2>
      <CountdownTimer timeUntilExpire={timerUntil} appDebugMode={debugMode} />
    </div>
  );
};
