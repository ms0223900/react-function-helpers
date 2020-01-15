import React from 'react';
import { shallow, mount } from 'enzyme';
import ShaderSlider, { getMax, getShadeStr } from 'components/common-components/colorPickerTool/ShadeSlider';
import { Slider, Typography } from '@material-ui/core';
import { colorShades } from 'components/common-components/colorPickerTool/colorConfig';
import { act } from 'react-test-renderer';

describe('test file', () => {
  const props = {
    onChangeFn: jest.fn(),
    sliderVal: 0,
  };

  it('should render correctly', () => {
    const wrapper = shallow(
      <ShaderSlider {...props} />
    );
    expect(wrapper.find(Slider)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
  });

  it('test onChangeFn should called correctly', () => {
    const onChangeFn = jest.fn();
    const wrapper = shallow(
      <ShaderSlider {...props} onChangeFn={onChangeFn} />
    );

    const onChange = wrapper.find(Slider).props().onChange;
    expect(onChangeFn).not.toHaveBeenCalled();
    act(() => {
      onChange && onChange({} as any, 10);
    });
    expect(onChangeFn).toHaveBeenCalled();
  });
  
  it('test getMax', () => {
    const mock = [0, 0, 0];
    const max = getMax(mock);
    expect(max).toEqual(mock.length - 1);
  });

  it('test Silder max should be getMax(colorShades)', () => {
    const max = getMax(colorShades);
    const wrapper = shallow(
      <ShaderSlider {...props} />
    );
    expect(wrapper.find(Slider).props().max).toEqual(max);
  });

  it('test text in Typography should be getShadeStr()', () => {
    const shadeStr = getShadeStr(colorShades, 0);
    const wrapper = shallow(
      <ShaderSlider {...props} />
    );
    expect(wrapper.find(Typography).props().children).toEqual(shadeStr);
  });


});