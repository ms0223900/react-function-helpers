import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { Callback } from 'all-common-types';
import { ITEM_WIDTH } from './colorConfig';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    cursor: 'pointer',
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
  },
  color: {
    width: '100%',
    height: '100%',
  },
  picked: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto',
  }
}));

interface ColorItemProps {
  color: string,
  isPicked?: boolean,
  onClick?: Callback
}
export const ColorItem = ({ color, isPicked, onClick }: ColorItemProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} onClick={onClick}>
      <Box 
        className={classes.color}
        style={{ backgroundColor: color }} />
      <Box 
        className={classes.picked} 
        display={'flex'} 
        alignItems={'center'} 
        justifyContent={'center'}
      >
        {!!isPicked && <CheckCircle />}
      </Box>
    </Box>
  );
};