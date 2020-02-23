import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import { Box } from '@material-ui/core';
import DegreePointer from './DegreePointer';
import useDomRef from './useDomRef';
import { PercentXY } from './types';
import { regularizeNumberToDigit2 } from './fn';

const halfPercent = 50;
const degreeCorrection = 90;

const DegreePointerContainer = () => {
  const [degree, setDegree] = useState<number | string>(0);

  const handleRotate = useCallback((percentXY: PercentXY) => {
    const {
      percentX,
      percentY,
    } = percentXY;
    const vectorX = percentX - halfPercent;
    const vectorY = percentY - halfPercent;
    const turn = Math.atan2(vectorY, vectorX);
    const degree = regularizeNumberToDigit2(turn / Math.PI * 180, 0);
    const correctedDegree = degree + degreeCorrection;
    setDegree(correctedDegree);
  }, []);

  const handleChangeDegree = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDegree(value);
  }, []);

  const {
    divRef,
  } = useDomRef(handleRotate);

  return (
    <DegreePointer
      pointerRef={divRef} 
      degree={degree}
      changeDegreeFn={handleChangeDegree} />
  );
};

export default DegreePointerContainer;