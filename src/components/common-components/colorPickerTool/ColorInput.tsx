import { Box, TextField, makeStyles } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(1),
  }
}));

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => any
  value: string
}
const ColorInput = ({
  onChange, value
}: Props) => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.root}
      placeholder={'#ffffff'} 
      onChange={onChange}
      value={value} />
  );
};

export default ColorInput;