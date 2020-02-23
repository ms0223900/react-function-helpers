import React, { ChangeEvent, Ref } from 'react';
import { Box, makeStyles, Theme, TextField, RootRef } from '@material-ui/core';

const width = 100;
const height = 100;

const useStyles = makeStyles<Theme, DegreePointerProps>(theme => ({
  root: {
    position: 'relative',
    width,
    height,
    borderRadius: 100000,
    backgroundColor: '#eee',
  },
  degree: {
    position: 'absolute',
    left: width / 2,
    width: 3,
    height: height / 2,
    backgroundColor: '#333',
    borderRadius: 1000,
    transformOrigin: '50% 100%',
    transform: props => `rotate(${props.degree}deg)`,
  }
}));

export interface DegreePointerProps {
  pointerRef?: Ref<HTMLDivElement>
  degree: number | string,
  changeDegreeFn?: (e: ChangeEvent<HTMLInputElement>) => any
}

const DegreePointer = (props: DegreePointerProps) => {
  const classes = useStyles(props);
  return (
    <Box>
      <RootRef rootRef={props.pointerRef as any}>
        <Box className={classes.root}>
          <Box className={classes.degree} />
        </Box>
      </RootRef>
      <TextField 
        label={'degree'}
        value={props.degree}
        onChange={props.changeDegreeFn} />
    </Box>
  );
};

export default DegreePointer;