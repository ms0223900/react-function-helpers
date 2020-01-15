import React, { createRef, useRef, MutableRefObject, RefObject } from 'react';
import { shallow, mount } from 'enzyme';
import ColorPickerToolContainer, { ColorPickerToolContainerRef, Actions } from 'components/common-components/colorPickerTool/ColorPickerToolContainer';
import { Typography } from '@material-ui/core';
import PickedColors from 'components/common-components/colorPickerTool/PickedColors';
import ColorInput from 'components/common-components/colorPickerTool/ColorInput';
import * as ColorPickerToolAll from 'components/common-components/colorPickerTool/ColorPickerTool';
import ShaderSlider from 'components/common-components/colorPickerTool/ShadeSlider';
import { act } from 'react-dom/test-utils';

describe('test ColorPickerToolContainer', () => {
  let SPY_USEEFFECT: any = undefined;

  beforeEach(() => {
    jest.resetAllMocks();
    SPY_USEEFFECT = jest.spyOn(React, 'useEffect');
  });

  const ColorPickerTool = ColorPickerToolAll.default;
  const wrapper = shallow(
    <ColorPickerToolContainer label={'primary'} />
  );

  it('should render correctly', () => {
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find(PickedColors)).toHaveLength(1);
    expect(wrapper.find(ColorInput)).toHaveLength(1);
    expect(wrapper.find(ColorPickerTool)).toHaveLength(1);
    expect(wrapper.find(ShaderSlider)).toHaveLength(1);
  });

  it('test Actions', () => {
    const dispatch = jest.fn();
    const params: ColorPickerToolAll.GetPickedColorNowParams = {
      colorIndex: 0,
      colorsArr: [],
      colorShade: 100,
    };
    Actions.setColorAction(params)(dispatch);
    expect(dispatch).toBeCalledWith(expect.any(String));
  });

  it('test handleInputColor', () => {
    const mockValue = '#000';
    const { onChange } = wrapper.find(ColorInput).props();

    act(() => {
      onChange({
        target: {
          value: mockValue,
        }
      } as any);
    });

    const { value } = wrapper.find(ColorInput).props();
    expect(value).toEqual(mockValue);
  });

  it('test handlePickColor and should trigger useEffect correctly', () => {
    const index = 10;
    const color = '#000';
    const { pickFn } = wrapper.find(ColorPickerTool).props();
    expect(SPY_USEEFFECT).not.toHaveBeenCalled();

    act(() => {
      pickFn(index, color)();
    });
    const { pickedColorIndex } = wrapper.find(ColorPickerTool).props();
    const { pickedColor } = wrapper.find(PickedColors).props();

    expect(pickedColorIndex).toEqual(index);
    expect(pickedColor).toEqual(color);
    expect(SPY_USEEFFECT).toHaveBeenCalled();
  });

  it('test handleChange', () => {
    const mockSliderVal = 1;
    const { onChangeFn } = wrapper.find(ShaderSlider).props();

    expect(SPY_USEEFFECT).not.toHaveBeenCalled();
    act(() => {
      onChangeFn({} as any, mockSliderVal);
    });
    
    const { sliderVal } = wrapper.find(ShaderSlider).props();
    expect(sliderVal).toEqual(mockSliderVal);
    expect(SPY_USEEFFECT).toHaveBeenCalled();
  });

  it('test ref', () => {
    let ref: RefObject<ColorPickerToolContainerRef> = { current: null };
    const WithRef = () => {
      ref = useRef<ColorPickerToolContainerRef>(null);
      return (
        <ColorPickerToolContainer label={'primary'} ref={ref} />
      );
    };
    const wrapperWithRef = mount(
      <WithRef />
    );
    const pickedColor = ref.current && ref.current.getPickedColor();
    expect(pickedColor).toEqual(expect.any(String));
  });
});