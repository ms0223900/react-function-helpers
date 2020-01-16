import { Box, Button, makeStyles } from '@material-ui/core';
import React, { MutableRefObject } from 'react';
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

const useStyles = makeStyles(() => ({
  root: {
    // padding: 8,
  }
}));

const ColorPickerToolList = ({
  labelsAndRefs, handleSetThemeColorFn
}: ColorPickerToolListProps<ColorPickerToolContainerRef>) => {

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box display={'flex'}>
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