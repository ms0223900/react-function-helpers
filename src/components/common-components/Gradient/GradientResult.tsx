import React from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
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

const useStyles = makeStyles<Theme, GradientResultProps>(theme => ({
  root: {
    background: props => (
      `linear-gradient(${props.degree}deg, ${handleGradientColorsToString(props.gradientItemValueList)});`
    ),
    minWidth: 400,
    minHeight: 300,
  }
}));


const GradientResult = (props: GradientResultProps) => {
  const classes = useStyles(props);
  return (
    <Box className={classes.root} />
  );
};

export default GradientResult;