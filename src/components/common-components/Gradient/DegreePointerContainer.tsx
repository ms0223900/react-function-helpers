import React, { useState, useCallback, ChangeEvent, useEffect, memo } from 'react';
import DegreePointer from './DegreePointer';
import useDomRef from './useDomRef';
import { PercentXY } from './types';
import getDegreeFromPercentXY from './fn/getDegreeFromPercentXY';

export interface DegreePointerContainerProps {
  getDegreeFn?: (deg: number) => any
  valsForDetect?: any[]
}

const DegreePointerContainer = (props: DegreePointerContainerProps) => {
  const [degree, setDegree] = useState<number>(0);

  const handleRotate = useCallback((percentXY: PercentXY) => {
    const degree = getDegreeFromPercentXY(percentXY);
    setDegree(degree);
  }, []);

  const handleChangeDegree = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let regValue = Number(value);
    if(isNaN(regValue)) {
      // regValue = 0;
    }
    setDegree(regValue);
  }, []);

  const {
    divRef,
  } = useDomRef(handleRotate, props.valsForDetect);

  useEffect(() => {
    if(props.getDegreeFn) {
      props.getDegreeFn(degree);
    }
  }, [degree]);

  return (
    <DegreePointer
      pointerRef={divRef} 
      degree={degree}
      changeDegreeFn={handleChangeDegree} />
  );
};

export default memo(DegreePointerContainer);