import { Box, Button, Fab, IconButton, TextField, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Callback } from 'all-common-types';
import React, { ChangeEvent } from 'react';
import { ColorItem } from '../colorPickerTool/ColorItem';
import { ColorPercent, GradientItemValue } from './types';

export interface GradientItemProps {
  values: GradientItemValue
  inputFn?: (name: ColorPercent) => (e: ChangeEvent<HTMLInputElement>) => any
  deleteFn?: Callback
}

const colorPercent: ColorPercent[] = ['color', 'percent'];

const GradientItem = (props: GradientItemProps) => {
  return (
    <Box display={'flex'} paddingTop={1} alignItems={'center'}>
      <ColorItem
        color={props.values.color} />
      <Box>
        {colorPercent.map((cp, i) => (
          <TextField
            key={cp}
            label={cp}
            value={props.values[cp]}
            variant={'outlined'}
            onChange={props.inputFn && props.inputFn(cp)} />
        ))}
      </Box>
      <IconButton size={'medium'} onClick={props.deleteFn}>
        <Delete />
      </IconButton>
    </Box>
  );
};

export default GradientItem;