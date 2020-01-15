import React from 'react';
import { shallow, mount } from 'enzyme';
import ColorPickerToolList, { LabelsAndRefs } from 'components/common-components/colorPickerTool/ColorPickerToolList';
import ColorPickerToolContainer, { ColorPickerToolContainerRef } from 'components/common-components/colorPickerTool/ColorPickerToolContainer';
import { Button } from '@material-ui/core';
import { act } from 'react-dom/test-utils';

describe('test ColorPickerToolList', () => {
  const handleSetThemeColorFn = jest.fn();
  const labelsAndRefs: LabelsAndRefs<ColorPickerToolContainerRef> = [
    {
      tabLabel: 'primary',
      ref: { current: null }
    }
  ];
  const wrapper = shallow(
    <ColorPickerToolList 
      labelsAndRefs={labelsAndRefs} 
      handleSetThemeColorFn={handleSetThemeColorFn} />
  );

  it('should render correctly', () => {
    const ColorPickerToolContainerLength = labelsAndRefs.length;
    expect(wrapper.find(ColorPickerToolContainer)).toHaveLength(ColorPickerToolContainerLength);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('test trigger handleSetThemeColorFn correctly', () => {
    const { onClick } = wrapper.find(Button).props();
    expect(handleSetThemeColorFn).not.toBeCalled();
    act(() => {
      onClick && onClick({} as any);
    });
    expect(handleSetThemeColorFn).toBeCalled();
  });
});