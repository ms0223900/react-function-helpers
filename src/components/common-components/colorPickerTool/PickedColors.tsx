import { Box, createMuiTheme, Theme } from '@material-ui/core';
import React from 'react';
import { ColorItem } from './ColorItem';

export class HandlePaletteColors {
  public static createSingleColorPalette = (color: string) => createMuiTheme({
    palette: {
      primary: {
        main: color
      },
    }
  })

  public static getPaletteColors(color: string) {
    let newTheme = createMuiTheme();
    try {
      // use primary to calculate dark and light colors
      newTheme = this.createSingleColorPalette(color);
    } catch(e) {
      
    }
    return newTheme.palette.primary;
  }

}

interface PickedColorsProps {
  pickedColor: string
}
const PickedColors = (props: PickedColorsProps) => {
  const paletteColors = HandlePaletteColors.getPaletteColors(props.pickedColor);
  const { light, dark, main } = paletteColors;
  return (
    <Box display={'flex'}>
      <ColorItem color={light} />
      <ColorItem color={main} />
      <ColorItem color={dark} />
    </Box>
  );
};

export default PickedColors;