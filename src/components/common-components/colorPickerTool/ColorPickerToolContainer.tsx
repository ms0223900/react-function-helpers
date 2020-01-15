import React, { useState, ChangeEvent, Ref, useImperativeHandle, forwardRef, useEffect, useCallback } from 'react';
import { Box, Typography } from '@material-ui/core';
import allColorsArr from './makeMaterialUIColors';
import ShaderSlider from './ShadeSlider';
import ColorInput from './ColorInput';
import { colorShades, defaultColorShadeIndex } from './colorConfig';
import ColorPickerTool, { getPickedColorNow, GetPickedColorNowParams } from './ColorPickerTool';
import PickedColors from './PickedColors';
import { PaletteKeys } from './types';
import { Callback } from 'all-common-types';

export interface ColorPickerToolContainerRef {
  getPickedColor: () => string
}
export interface ColorPickerToolContainerProps {
  label: PaletteKeys
}

export class Actions {
  static setColorAction = (params: GetPickedColorNowParams) => (dispatch: Callback) => {
    console.log('dispatch');
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