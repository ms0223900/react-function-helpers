import React from 'react';
import { shallow, mount } from 'enzyme';
import allColorsArr from 'components/common-components/colorPickerTool/makeMaterialUIColors';
import ColorPickerTool, { ColorPickerToolProps, getPickedColorNow } from 'components/common-components/colorPickerTool/ColorPickerTool';
import { ColorItem } from 'components/common-components/colorPickerTool/ColorItem';
import { act } from 'react-test-renderer';
import { Color } from '@material-ui/core';

beforeEach(() => {
  // jest.resetAllMocks();
});

describe('test ColorPickerTool', () => {
  const onClickFn = jest.fn();
  const pickFn = jest.fn().mockImplementation(() => onClickFn);
  const props = {
    colorShade: 100,
    pickedColorIndex: 0,
    pickFn,
  } as ColorPickerToolProps;

  it('should render correctly', () => {
    const allColorsLength = allColorsArr.length;
    const wrapper = shallow(
      <ColorPickerTool {...props} />
    );
    expect(wrapper.find(ColorItem)).toHaveLength(allColorsLength);
  });

  it('test pickFn should be called correctly', () => {
    const itemColor = allColorsArr[props.pickedColorIndex as number][props.colorShade];
    const wrapper = shallow(
      <ColorPickerTool {...props} />
    );
    const onClick = wrapper.find(ColorItem).at(0).props().onClick;
    act(() => {
      onClick && onClick();
    });

    expect(pickFn).toBeCalledWith(0, itemColor);
  });
});

describe('test getPickedColorNow', () => {
  const params = {
    colorsArr: allColorsArr,
    colorIndex: 0,
    colorShade: 100 as keyof Color,
  };

  it('test colorIndex is typeof number condition', () => {
    const EXPECT = allColorsArr[params.colorIndex][params.colorShade];
    const result = getPickedColorNow(params);
    expect(result).toEqual(EXPECT);
  });

  it('test colorIndex is "not" typeof number condition', () => {
    const EXPECT = '';
    const result = getPickedColorNow({
      ...params,
      colorIndex: undefined,
    });
    expect(result).toEqual(EXPECT);
  });
});
