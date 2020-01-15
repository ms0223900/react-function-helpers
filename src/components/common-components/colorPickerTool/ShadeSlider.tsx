import { Box, Slider, Typography } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { colorShades, ColorShades, defaultColorShadeIndex } from './colorConfig';

export const getMax = (arr: any[]) => arr.length - 1;
export const getShadeStr = (shades: ColorShades, sliderVal: number) => shades[sliderVal];

interface Props {
  onChangeFn: (e: ChangeEvent<{}>, value: any) => any
  sliderVal: number
}
const ShaderSlider = ({
  onChangeFn, sliderVal
}: Props) => {
  const max = getMax(colorShades);
  const shadeStr = getShadeStr(colorShades, sliderVal);

  return (
    <Box>
      <Slider
        defaultValue={defaultColorShadeIndex}
        aria-labelledby={'shade-slider'}
        onChange={onChangeFn}
        step={1}
        min={0}
        max={max}
      />
      <Typography>{shadeStr}</Typography>
    </Box>
  );
};

export default ShaderSlider;