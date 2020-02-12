import useInterval from 'lib/customHooks/useInterval';
import React, { ReactNodeArray } from 'react';

const defaultIntervalTime = 2;

export interface TimerQueueWrapperProps {
  children: ReactNodeArray
  intervalSeconds?: number
}

const TimerQueueWrapper = (props: TimerQueueWrapperProps) => {
  const {
    children,
    intervalSeconds=defaultIntervalTime
  } = props;
  const maxQueue = children.length - 1;
  const {
    timeNow,
  } = useInterval({
    refreshCount: maxQueue,
    secondsPerStep: intervalSeconds
  });
  
  return (
    <>
      {children[timeNow]}
    </>
  );
};

export default TimerQueueWrapper;