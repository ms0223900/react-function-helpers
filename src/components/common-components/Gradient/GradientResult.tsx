import { Box, makeStyles, Theme, RootRef } from '@material-ui/core';
import React, { forwardRef, Ref, MutableRefObject, RefObject, useRef, useEffect } from 'react';
import { GradientItemValue } from './types';

export interface GradientResultProps {
  degree: number
  gradientItemValueList: GradientItemValue[]
}
const handleColorAndPercentToStr = (val: GradientItemValue) => (
  `${val.color} ${val.percent}%`
);

const handleGradientColorsToString = (valueList: GradientItemValue[]) => {
  const values = valueList.map(val => handleColorAndPercentToStr(val));
  return values.join(', ');
};

const getGradientColor = (props: GradientResultProps) => (
  `linear-gradient(${props.degree}deg, ${handleGradientColorsToString(props.gradientItemValueList)})`
);

const useStyles = makeStyles<Theme, GradientResultProps>(theme => ({
  root: {
    background: getGradientColor,
    minWidth: 400,
    minHeight: 300,
  }
}));


const GradientResult = forwardRef((props: GradientResultProps, ref) => {
  const classes = useStyles(props);

  return (
    <RootRef rootRef={ref as any}>
      <Box
        className={classes.root} />
    </RootRef>
  );
});

export default GradientResult;