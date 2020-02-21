import React, { useRef, useState } from 'react';
import { Box } from '@material-ui/core';
import GradientResult, { GradientResultProps } from './GradientResult';

const checkPercentIsInRange = (percent: number) => (
  percent >= 0 && percent <= 1
);

const handlePercent = (percent: number) => {
  const rawPercent = ~~(percent * 10000) / 100;
  if(rawPercent <= 0) return 0;
  if(rawPercent >= 100) return 100;
  return rawPercent;
};

const getRectClientPercentX = (domRect: DOMRect, clientX: number) => {
  const {
    x, width,
  } = domRect;
  const distanceX = clientX - x;
  const rawPercent = distanceX / width;
  return rawPercent;
};

const getRectClientPercentY = (domRect: DOMRect, clientY: number) => {
  const {
    y, height,
  } = domRect;
  const distanceY = clientY - y;
  const rawPercent = distanceY / height;
  return rawPercent;
};

const GradientResultContainer = (props: GradientResultProps) => {
  const isClicked = useRef(false);
  const domSpec = useRef<DOMRect>();
  const divRef = useRef<HTMLDivElement>();

  const [percentXY, setP] = useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    if(divRef.current) {
      domSpec.current = divRef.current.getBoundingClientRect();
    }

    window.addEventListener('mousedown', () => {
      isClicked.current = true;
    });
    window.addEventListener('mouseup', () => {
      isClicked.current = false;
    });
    window.addEventListener('mousemove', (e) => {
      if(isClicked.current && domSpec.current) {
        const { 
          clientX,
          clientY 
        } = e;
        const percentX = getRectClientPercentX(domSpec.current, clientX);
        const percentY = getRectClientPercentY(domSpec.current, clientY);
        const isInRange = 
          checkPercentIsInRange(percentY) && 
          checkPercentIsInRange(percentX);
        if(isInRange) {
          setP({
            x: handlePercent(percentX),
            y: handlePercent(percentY),
          });
        }
      }
    });
  }, []);

  return (
    <Box position={'relative'}>
      <GradientResult
        ref={divRef}
        {...props} />
      <span style={{
        userSelect: 'none',
        position: 'absolute',
        top: `${percentXY.y}%`,
        left: `${percentXY.x}%`,
      }}>
        {`${percentXY.x} %, ${percentXY.y} %`}
      </span>
    </Box>
  );
};

export default GradientResultContainer;