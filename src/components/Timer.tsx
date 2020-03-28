import React, { useState, useEffect } from 'react';
import '../styles/TimerStyle.css';
interface Props {
    onToggle?: boolean;
    onReset?: boolean;
    readOnly: boolean;
    dispatchTime?: Function;
}

const Timer: React.FC<Props> = ({onToggle, onReset, readOnly, dispatchTime}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    if (onToggle)
        setIsActive(true)
    else {
        if (isActive && dispatchTime)
            dispatchTime(seconds)
        setIsActive(false);
    }
    if (onReset) {
        setIsActive(false);
        setSeconds(0);
    }
  }, [onToggle, onReset]);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
      <div id="timer">
        <div className="time">
            {seconds}
        </div>
        { !readOnly &&
            <div className="timerButtons">
                <button className="timerToggle" onClick={toggle}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className="timerReset" onClick={reset}>
                    Reset
                </button>
            </div>
        }
      </div>
  );
};

export default Timer;