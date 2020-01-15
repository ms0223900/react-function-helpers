import React, { ChangeEvent } from 'react';
import { Box, TextField } from '@material-ui/core';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => any
  value: string
}
const ColorInput = ({
  onChange, value
}: Props) => {
  return (
    <TextField
      placeholder={'#ffffff'} 
      onChange={onChange}
      value={value} />
  );
};

export default ColorInput;