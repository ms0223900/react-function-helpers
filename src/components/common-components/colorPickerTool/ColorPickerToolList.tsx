import { Box, Button, makeStyles } from '@material-ui/core';
import React, { MutableRefObject } from 'react';
import { PICKER_TOOL_WIDTH } from './colorConfig';
import ColorPickerToolContainer, { ColorPickerToolContainerRef } from './ColorPickerToolContainer';
import { PaletteKeys } from './types';

export type LabelsAndRefs<RefType> = Array<{
  tabLabel: PaletteKeys,
  ref: MutableRefObject<RefType | null>
}>
export interface ColorPickerToolListProps<RefType> {
  labelsAndRefs: LabelsAndRefs<RefType>
  handleSetThemeColorFn: () => any
}

const useStyles = makeStyles(theme => ({
  root: {
    // padding: 8,
  },
  toolPart: {
    display: 'flex',
    [theme.breakpoints.down( (PICKER_TOOL_WIDTH + theme.spacing(0.5)) * 2 )]: {
      display: 'block'
    },
  }
}));

const ColorPickerToolList = ({
  labelsAndRefs, handleSetThemeColorFn
}: ColorPickerToolListProps<ColorPickerToolContainerRef>) => {

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.toolPart}>
        {labelsAndRefs.map((labelAndRef, i) => (
          <ColorPickerToolContainer
            key={i} 
            label={labelAndRef.tabLabel}
            ref={labelAndRef.ref} />
        ))}
      </Box>
      <Button 
        onClick={handleSetThemeColorFn} 
        variant={'contained'} 
        color={'primary'}
      >
        {'set theme'}
      </Button>
    </Box>
  );
};

export default ColorPickerToolList;