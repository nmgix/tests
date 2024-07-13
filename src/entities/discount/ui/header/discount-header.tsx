import { CountdownTimer } from "src/shared/ui";
import "./discount-header.scss";
import { useAction } from "src/shared/lib/hooks/redux";
import { useDebug } from "src/entities/debug";

export const DiscountHeader: React.FC = () => {
  const { debug } = useDebug();
  const timerUntil = new Date(debug ? Date.now() + 35000 : Date.now() + 60000 * 2);

  const { changeDiscount } = useAction();

  return (
    <div className='discount-header'>
      <h2 className='discount-header__title'>Скидка действует:</h2>
      <CountdownTimer timeUntilExpire={timerUntil} onCountEnd={() => changeDiscount({ lastChance: true, discount: false })} appDebugMode={debug} />
    </div>
  );
};
