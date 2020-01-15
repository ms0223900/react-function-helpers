import React from 'react';
import { shallow, mount } from 'enzyme';
import ColorPickerToolListContainer from 'components/common-components/colorPickerTool/ColorPickerToolListContainer';
import ColorPickerToolList from 'components/common-components/colorPickerTool/ColorPickerToolList';
import { act } from 'react-test-renderer';

describe('test ColorPickerToolListContainer', () => {
  const setThemeColorsFn = jest.fn();
  const wrapper = shallow(
    <ColorPickerToolListContainer setThemeColorsFn={setThemeColorsFn} />
  );

  it('should render correctly', () => {
    expect(wrapper.find(ColorPickerToolList)).toHaveLength(1);
  });

  it('setThemeColorsFn should be called correctly', () => {
    const { handleSetThemeColorFn } = wrapper.find(ColorPickerToolList).props();

    expect(setThemeColorsFn).not.toBeCalled();
    act(() => {
      handleSetThemeColorFn && handleSetThemeColorFn();
    });
    expect(setThemeColorsFn).toHaveBeenCalledWith({
      primary: expect.any(String),
      secondary: expect.any(String)
    });
  });
});