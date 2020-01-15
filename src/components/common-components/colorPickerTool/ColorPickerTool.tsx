import { Box, Color, makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import { PICKER_TOOL_WIDTH } from './colorConfig';
import { ColorItem,  } from './ColorItem';
import allColorsArr from './makeMaterialUIColors';

export interface GetPickedColorNowParams {
  colorsArr: Color[], 
  colorIndex: number | undefined, 
  colorShade: (keyof Color)
}
export const getPickedColorNow = ({colorsArr, colorIndex, colorShade}: {
  colorsArr: Color[], 
  colorIndex: number | undefined, 
  colorShade: (keyof Color)
}): string => {
  return typeof colorIndex === 'number' && colorsArr.length > 0 ?
    colorsArr[colorIndex][colorShade] : '';
};

const useStyles = makeStyles(() => ({
  root: {
    width: PICKER_TOOL_WIDTH,
  }
}));

export interface ColorPickerToolProps {
  colorShade: keyof Color
  pickedColorIndex: number | undefined
  pickFn: (index:number, color: string) => () => any
}
const ColorPickerTool = ({ colorShade, pickedColorIndex, pickFn }: ColorPickerToolProps) => {
  const classes = useStyles();
  const handlePick = useCallback((i: number, itemColor: string) => {
    return () => pickFn(i, itemColor)();
  }, [pickFn]);
  
  return (
    <Box className={classes.root} display={'flex'} flexWrap={'wrap'}>
      {allColorsArr.map((color, i) => {
        const itemColor = color[colorShade];
        const isPicked = i === pickedColorIndex;
        return (
          <ColorItem 
            key={i} 
            color={itemColor} 
            isPicked={isPicked} 
            onClick={handlePick(i, itemColor)} />
        );
      })}
    </Box>
  );
};


export default ColorPickerTool;