import { Callback } from 'all-common-types';
import { useCallback, useEffect, useState } from 'react';

const defaultSecondPerStep = 1;

export interface UseInterval {
  refreshCount: number
  secondsPerStep?: number
  refreshCallback?: Callback
}

export const updateFn = (params: UseInterval) => (q: number) => {
  const {
    refreshCount,
    refreshCallback
  } = params;
  if(q === refreshCount) {
    if(refreshCallback) { refreshCallback(); }
    return 0;
  }
  return q + 1;
};

const useInterval = (params: UseInterval) => {
  const {
    secondsPerStep=defaultSecondPerStep,
    refreshCallback
  } = params;
  const [timeNow, setTimeNow] = useState(0);

  const handleInterval = useCallback(() => {
    setTimeNow(updateFn(params));
  }, [params]);
  
  const handleManualRefresh = useCallback(() => {
    setTimeNow(0);
    if(refreshCallback) { refreshCallback(); }
  }, [refreshCallback]);
  
  useEffect(() => {
    const queueTimer = setInterval(() => {
      handleInterval();
    }, secondsPerStep * 1000);
    return () => clearInterval(queueTimer);
  }, [handleInterval, secondsPerStep]);

  return ({
    timeNow,
    manualRefresh: handleManualRefresh
  });
};

export default useInterval;