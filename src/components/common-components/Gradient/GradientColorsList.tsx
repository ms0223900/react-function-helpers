import { Box, Button } from '@material-ui/core';
import { Callback, ID } from 'all-common-types';
import React from 'react';
import GradientItemContainer from './GradientItemContainer';
import { ColorPercent, GradientItemValue } from './types';
import ColorPinList from './ColorPinList';

export interface GradientColorsListProps {
  gradientItemValueList: GradientItemValue[]
  addColorFn?: Callback
  deleteColorFn?: (id: ID) => any
  editColorPercentFn?: (id: ID) => (nameVal: {
    name: ColorPercent,
    value: string
  }) => any
  setSelectedPercentFn?: (id: ID, percent: number) => any
}

const GradientColorsList = (props: GradientColorsListProps) => {
  return (
    <Box>
      <ColorPinList 
        gradientItemValueList={props.gradientItemValueList}
        setSelectedPercent={props.setSelectedPercentFn} />
      {props.gradientItemValueList.map((val, i) => (
        <GradientItemContainer
          key={val.id}
          values={val}
          deleteFn={
            props.deleteColorFn && props.deleteColorFn(val.id)
          }
          editColorPercentFn={
            props.editColorPercentFn && props.editColorPercentFn(val.id)
          } />
      ))}
      <Button onClick={props.addColorFn}>
        {'+ add color'}
      </Button>
    </Box>
  );
};

export default GradientColorsList;