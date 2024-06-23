import { useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import classnames from "classnames";
import "./countdown-timer.scss";

type TTimerRendererProps = { debug?: boolean } & CountdownRenderProps;

const TimerRenderer: React.FC<TTimerRendererProps> = ({ total, minutes, seconds, debug }) => {
  return (
    <div className={classnames("countdown-timer", { "countdown-timer__warn": total <= 30000 || debug })}>
      <div className='countdown-timer__time'>
        <h1 className='timer__time'>{minutes}</h1>
        <h4 className='timer__units'>минут</h4>
      </div>
      <div className='countdown-timer__time-separator' />
      <div className='countdown-timer__time'>
        <h1 className='timer__time'>{seconds}</h1>
        <h4 className='timer__units'>секунд</h4>
      </div>
    </div>
  );
};

interface ICountdownTimerProps {
  timeUntilExpire: Date;
  appDebugMode?: boolean;
}

export const CountdownTimer: React.FC<ICountdownTimerProps> = props => {
  const [localDebugActive, setlocalDebugMode] = useState(false); //для показа анимации при 30сек таймере

  return (
    <>
      <Countdown date={props.timeUntilExpire} renderer={timeProps => <TimerRenderer {...timeProps} debug={localDebugActive} />} />
      {props.appDebugMode && <input type='checkbox' onChange={e => setlocalDebugMode(e.target.checked)} />}
    </>
  );
};
