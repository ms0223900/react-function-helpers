import { Box } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import GradientItem, { GradientItemProps } from './GradientItem';
import { ColorPercent } from './types';

export interface GradientItemContainerProps extends GradientItemProps {
  editColorPercentFn?: (nameVal: {
    name: ColorPercent, value: string
  }) => any
}

const GradientItemContainer = (props: GradientItemContainerProps) => {
  const handleEditColorPercent = useCallback((name: ColorPercent) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if(props.editColorPercentFn) {
        props.editColorPercentFn({
          name,
          value
        });
      }
    };
  }, []);

  return (
    <GradientItem 
      {...props}
      inputFn={handleEditColorPercent} />
  );
};

export default GradientItemContainer;