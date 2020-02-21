import React from 'react';
import { Box, Button } from '@material-ui/core';
import { GradientItemValue, ColorPercent } from './types';
import { Callback } from 'all-common-types';
import GradientItemContainer from './GradientItemContainer';

export interface GradientColorsListProps {
  gradientItemValueList: GradientItemValue[]
  addColorFn?: Callback
  editColorPercentFn?: (index: number) => (nameVal: {
    name: ColorPercent,
    value: string
  }) => any
}

const GradientColorsList = (props: GradientColorsListProps) => {
  return (
    <Box>
      {props.gradientItemValueList.map((val, i) => (
        <GradientItemContainer
          key={i}
          values={val}
          editColorPercentFn={props.editColorPercentFn && props.editColorPercentFn(i)} />
      ))}
      <Button onClick={props.addColorFn}>
        {'+ add color'}
      </Button>
    </Box>
  );
};

export default GradientColorsList;