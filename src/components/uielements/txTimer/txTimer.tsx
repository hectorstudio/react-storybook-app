/* eslint react/prop-types: 0 */

import React, { useCallback, useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { ConfirmIcon, RefundIcon } from '../../icons/timerIcons';
import { TxTimerWrapper } from './txTimer.style';
import useInterval, { INACTIVE_INTERVAL } from '../../../hooks/useInterval';

import 'react-circular-progressbar/dist/styles.css';

interface Props {
  status: boolean;
  value: number;
  maxValue: number;
  startTime: number;
  interval?: number;
  onChange?: () => void;
  onEnd?: () => void;
  refunded?: boolean;
  className?: string;
}

const TxTimer: React.FC<Props> = (props): JSX.Element => {
  const {
    status = false,
    value,
    maxValue,
    startTime,
    onChange = () => {},
    interval = 1000,
    refunded = false,
    onEnd = () => {},
    className = '',
  } = props;

  const [active, setActive] = useState(false);
  const [totalDuration, setTotalDuration] = useState();

  // Check if counter has reached the end
  const isEnd = useCallback(() => value >= maxValue, [value, maxValue]);

  // Callback for counting
  const countHandler = useCallback(() => {
    onChange();
  }, [onChange]);
  // Interval to inform outside world about counting
  const countInterval = status && !isEnd() ? interval : INACTIVE_INTERVAL;

  useInterval(countHandler, countInterval);

  // Callback for counting time differences
  const countSecHandler = useCallback(() => {
    const diff = (Date.now() - startTime) / 1000;
    setTotalDuration(diff);
  }, [startTime]);
  // Interval to count seconds
  const countSecInterval =
    startTime && status && !isEnd() ? 100 : INACTIVE_INTERVAL;
  useInterval(countSecHandler, countSecInterval);

  // Reset everything at end
  const handleEndTimer = useCallback(() => {
    onEnd();
    setActive(false);
  }, [onEnd]);

  // Delay the end of counting - for UX purposes only
  useEffect(() => {
    if (isEnd() && status) {
      const id = setTimeout(handleEndTimer, 1000);
      return () => clearTimeout(id);
    }
  }, [handleEndTimer, isEnd, status]);

  // Internal `active` state depends on `status`
  useEffect(() => {
    setActive(status);
  }, [status]);

  const hide = isEnd() && !active;
  const CircularProgressbarStyle = `${
    hide ? 'hide' : ''
  } timerchart-circular-progressbar`;

  const totalDurationString =
    totalDuration < 10
      ? Number(totalDuration).toFixed(1)
      : Math.round(totalDuration).toString();

  return (
    <TxTimerWrapper className={`txTimer-wrapper ${className}`}>
      <div className="timerchart-icon">
        {!active && (
          <div className="confirm-icon">
            {!refunded ? <ConfirmIcon /> : <RefundIcon />}
          </div>
        )}
      </div>
      {active && (
        <CircularProgressbar
          className={CircularProgressbarStyle}
          value={value}
          text={`${totalDurationString}s`}
          strokeWidth={7}
          counterClockwise
          styles={buildStyles({
            textColor: '#50E3C2',
            textSize: '14px',
            pathColor: '#50E3C2',
            trailColor: '#F2F2F2',
            pathTransition: 'stroke-dashoffset 0.5s linear 0s',
          })}
        />
      )}
    </TxTimerWrapper>
  );
};

export default TxTimer;
