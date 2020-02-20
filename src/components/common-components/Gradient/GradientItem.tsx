import React from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { Callback } from 'all-common-types';
import { ColorItem } from '../colorPickerTool/ColorItem';
import { GradientItemValue } from './types';

export interface GradientItemProps {
  values: GradientItemValue
  inputFn?: Callback
}

const GradientItem = (props: GradientItemProps) => {
  return (
    <Box display={'flex'}>
      <ColorItem
        color={props.values.color} />
      <Box>
        <Typography>{'color'}</Typography>
        <TextField />
      </Box>
      <Box>
        <Typography>{'percent'}</Typography>
        <TextField />
      </Box>
    </Box>
  );
};

export default GradientItem;