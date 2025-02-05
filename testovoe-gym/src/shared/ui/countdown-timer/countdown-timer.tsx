import { useEffect, useRef, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import classnames from "classnames";
import "./countdown-timer.scss";

type TTimerRendererProps = { debug?: boolean } & CountdownRenderProps;

const TimerRenderer: React.FC<TTimerRendererProps> = ({ total, formatted: { minutes, seconds }, debug }) => {
  return (
    <div className={classnames("countdown-timer", { "countdown-timer--warn": total <= 30000 || debug })}>
      <div className='countdown-timer__time'>
        <h1 className='timer__time'>{minutes}</h1>
        <h4 className='timer__units'>минут</h4>
      </div>
      <span className='countdown-timer__time-separator'>&#58;</span>
      <div className='countdown-timer__time'>
        <h1 className='timer__time'>{seconds}</h1>
        <h4 className='timer__units'>секунд</h4>
      </div>
    </div>
  );
};

interface ICountdownTimerProps {
  timeUntilExpire: Date;
  onCountEnd: () => void;
  appDebugMode?: boolean;
  debugComponents?: React.ReactNode;
}

export const CountdownTimer: React.FC<ICountdownTimerProps> = props => {
  const [countdownAnimationActive, setCountdownAnimation] = useState(false); // для показа анимации при 30сек таймере
  const countdownRef = useRef<Countdown>(null);
  useEffect(() => {
    countdownRef.current?.start();
  }, [props.timeUntilExpire]);

  return (
    <>
      <Countdown
        ref={countdownRef}
        date={props.timeUntilExpire}
        renderer={timeProps => <TimerRenderer {...timeProps} debug={countdownAnimationActive} />}
        daysInHours={true}
        onComplete={props.onCountEnd}
      />
      {props.appDebugMode && (
        <div>
          <input id='debug-timer-styles' type='checkbox' onChange={e => setCountdownAnimation(e.target.checked)} />
          <label htmlFor='debug-timer-styles'>timer-styles</label>
          {props.debugComponents}
        </div>
      )}
      {props.appDebugMode && <button onClick={() => props.onCountEnd()}>модальное окно</button>}
    </>
  );
};
