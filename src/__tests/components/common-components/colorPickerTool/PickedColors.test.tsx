import React from 'react';
import { shallow, mount } from 'enzyme';
import PickedColors, { HandlePaletteColors } from 'components/common-components/colorPickerTool/PickedColors';
import { createMuiTheme, Theme } from '@material-ui/core';
import { ColorItem } from 'components/common-components/colorPickerTool/ColorItem';

describe('test HandlePaletteColors', () => {
  it('test createSingleColorPalette', () => {
    const COLOR = '#fff';
    const NOT_FORMAT_COLOR = '';

    const RESULT_NORMAL = () => HandlePaletteColors.createSingleColorPalette(COLOR);
    const RESULT_ERROR = () => HandlePaletteColors.createSingleColorPalette(NOT_FORMAT_COLOR);

    expect(RESULT_NORMAL).not.toThrowError();
    expect(RESULT_ERROR).toThrowError();
  });

  it('test getPaletteColors(determined by color)', () => {
    const COLOR = '#fff';
    const NOT_FORMAT_COLOR = '';

    const RESULT_NOT_FORMAT_COLOR = HandlePaletteColors.getPaletteColors(NOT_FORMAT_COLOR);
    const EXPECT_NOT_FORMAT_COLOR = createMuiTheme().palette.primary;
    expect(RESULT_NOT_FORMAT_COLOR).toEqual(EXPECT_NOT_FORMAT_COLOR);

    const RESULT_FORMAT_COLOR = HandlePaletteColors.getPaletteColors(COLOR);
    const EXPECT_FORMAT_COLOR = HandlePaletteColors.createSingleColorPalette(COLOR).palette.primary;
    expect(RESULT_FORMAT_COLOR).toEqual(EXPECT_FORMAT_COLOR);
  });
});

describe('test PickedColors', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <PickedColors pickedColor={''} />
    );
    expect(wrapper.find(ColorItem)).toHaveLength(3);
  });
});