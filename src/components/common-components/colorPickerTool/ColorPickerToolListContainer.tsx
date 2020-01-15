import React, { useRef, MutableRefObject } from 'react';
import { ColorPickerToolContainerRef } from './ColorPickerToolContainer';
import { ThemeCustomizableColors } from './types';
import ColorPickerToolList from './ColorPickerToolList';
import { PaletteKeys } from './types';

export const getColorOfColorPickerTool = (ref: MutableRefObject<ColorPickerToolContainerRef | null>): string => (
  ref.current ? ref.current.getPickedColor() : ''
);

type LabelsAndRefs<Ref> = {
  tabLabel: PaletteKeys,
  ref: MutableRefObject<Ref>
}[]

export interface ColorPickerToolListContainerProps {
  setThemeColorsFn?: (colors: ThemeCustomizableColors) => any
}
const ColorPickerToolListContainer = ({
  setThemeColorsFn
}: ColorPickerToolListContainerProps) => {
  const PRIMARY_REF = useRef<ColorPickerToolContainerRef>(null);
  const SECONDARY_REF = useRef<ColorPickerToolContainerRef>(null);
  const labelsAndRefs = [
    { tabLabel: 'primary', ref: PRIMARY_REF, },
    { tabLabel: 'secondary', ref: SECONDARY_REF, },
  ] as LabelsAndRefs<ColorPickerToolContainerRef>;

  const handleSetThemeColor = () => {
    const themeColors: ThemeCustomizableColors = {
      primary: getColorOfColorPickerTool(labelsAndRefs[0].ref),
      secondary: getColorOfColorPickerTool(labelsAndRefs[1].ref),
    };
    setThemeColorsFn && setThemeColorsFn(themeColors);
  };

  return (
    <ColorPickerToolList
      labelsAndRefs={labelsAndRefs}
      handleSetThemeColorFn={handleSetThemeColor} />
  );
};

export default ColorPickerToolListContainer;