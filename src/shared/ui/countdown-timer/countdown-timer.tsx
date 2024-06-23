import { useState } from "react";
import "./countdown-timer.scss";

interface ICountdownTimerProps {
  timeUntilExpire: Date;
  appDebugMode?: boolean;
}

export const CountdownTimer: React.FC<ICountdownTimerProps> = ({ timeUntilExpire, appDebugMode }) => {
  const [localDebugActive, setlocalDebugMode] = useState(false); //для показа анимации при 30сек таймере

  const minutes_mock = "09";
  const seconds_mock = "09";

  return (
    <>
      <div className='countdown-timer'>
        <div className='countdown-timer__time'>
          <h1 className='timer__time'>{minutes_mock}</h1>
          <h4 className='timer__units'>минут</h4>
        </div>
        <div className='countdown-timer__time-separator' />
        <div className='countdown-timer__time'>
          <h1 className='timer__time'>{seconds_mock}</h1>
          <h4 className='timer__units'>секунд</h4>
        </div>
      </div>
      {appDebugMode && <input type='checkbox' onChange={e => setlocalDebugMode(e.target.checked)} />}
    </>
  );
};
