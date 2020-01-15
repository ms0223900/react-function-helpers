import { Box, Typography } from '@material-ui/core';
import { Callback } from 'all-common-types';
import React, { ChangeEvent, forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { colorShades, defaultColorShadeIndex } from './colorConfig';
import ColorInput from './ColorInput';
import ColorPickerTool, { getPickedColorNow, GetPickedColorNowParams } from './ColorPickerTool';
import allColorsArr from './makeMaterialUIColors';
import PickedColors from './PickedColors';
import ShaderSlider from './ShadeSlider';
import { PaletteKeys } from './types';

export interface ColorPickerToolContainerRef {
  getPickedColor: () => string
}
export interface ColorPickerToolContainerProps {
  label: PaletteKeys
}

export class Actions {
  public static setColorAction = (params: GetPickedColorNowParams) => (dispatch: Callback) => {
    const colorNow = getPickedColorNow(params);
    dispatch(colorNow);
  }
}


const ColorPickerToolContainer = (
  props: ColorPickerToolContainerProps, 
  ref: Ref<ColorPickerToolContainerRef>
) => {
  const { label } = props;
  const [pickedColor, setColor] = useState('#fff');
  const [pickedColorIndex, setColorIndex] = useState<number>();
  const [sliderVal, setSliderVal] = useState(defaultColorShadeIndex);
  useImperativeHandle(ref, () => ({
    getPickedColor: () => pickedColor
  }), [pickedColor]);
  
  const colorShade = colorShades[sliderVal];

  const handleInputColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setColor(color);
  }, []);
  const handlePickColor = useCallback((index:number, color: string) => {
    return () => {
      setColorIndex(index);
      setColor(color);
    };
  }, []);
  const handleChange = useCallback((e: ChangeEvent<{}>, val: any) => {
    setSliderVal(val);
  }, []);
  React.useEffect(() => {
    Actions.setColorAction({
      colorsArr: allColorsArr,
      colorIndex: pickedColorIndex,
      colorShade,
    })(setColor);
  }, [colorShade, pickedColorIndex]);

  return (
    <Box>
      <Typography variant={'h6'}>{label}</Typography>
      <PickedColors pickedColor={pickedColor} />
      <ColorInput onChange={handleInputColor} value={pickedColor} />
      <ColorPickerTool 
        colorShade={colorShade}
        pickedColorIndex={pickedColorIndex}
        pickFn={handlePickColor} />
      <ShaderSlider onChangeFn={handleChange} sliderVal={sliderVal} />
    </Box>
  );
};



export default forwardRef(ColorPickerToolContainer);