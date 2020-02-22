import React, { useCallback } from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { GradientItemValue, ColorPinProps } from './types';

const useStyles = makeStyles<Theme, ColorPinProps>(theme => ({
  root: {
    position: 'absolute',
    top: props => props.position.y,
    left: props => `${props.gradientItemValue.percent}%`,
    backgroundColor: props => props.gradientItemValue.color,
    width: 30,
    height: 60,
    border: '2px solid #aaa',
    borderColor: props => props.isSelected ? '#a00' : '#ddd',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.9,
    }
  }
}));

const ColorPinItem = (props: ColorPinProps) => {
  const classes = useStyles(props);

  const handleClick = useCallback(() => {
    if(props.clickFn)
      props.clickFn();
  }, [props.clickFn]);

  return (
    <Box 
      className={classes.root}
      style={{
        left: `${props.gradientItemValue.percent}%`,
      }}
      onMouseDown={handleClick} />
  );
};

export default ColorPinItem;