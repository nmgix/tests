import { CountdownTimer } from "src/shared/ui";
import "./discount-header.scss";
import { useAction } from "src/shared/lib/hooks/redux";
import { useDebug } from "src/entities/debug";
import { useEffect, useState } from "react";

export const DiscountHeader: React.FC = () => {
  const { changeDiscount } = useAction();

  const { debug } = useDebug();
  const [timerShortActive, setTimerShort] = useState(false); // для таймера в 5 сек вместо 30 в дев моде и 2мин в обычной версии
  const debugBtn = (
    <div>
      <input id='debug-timer-time' type='checkbox' onChange={e => setTimerShort(e.target.checked)} />
      <label htmlFor='debug-timer-time'>timer-time</label>
    </div>
  );

  const createTTL = (debug?: boolean, timerShort?: boolean) => {
    let _timerUntil = Date.now() + 60000 * 2;
    if (debug) _timerUntil = Date.now() + 35000;
    if (debug && timerShort) _timerUntil = Date.now() + 5000;
    return new Date(_timerUntil);
  };
  const timerUntil = createTTL(debug, timerShortActive);

  useEffect(() => {
    if (debug === true || timerShortActive === true) {
      changeDiscount({ discount: true, lastChance: false });
    }
  }, [debug, timerShortActive]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='discount-header'>
      <h2 className='discount-header__title'>Скидка действует:</h2>
      <CountdownTimer
        timeUntilExpire={timerUntil}
        onCountEnd={() => changeDiscount({ lastChance: true, discount: false })}
        appDebugMode={debug}
        debugComponents={debugBtn}
      />
    </div>
  );
};
