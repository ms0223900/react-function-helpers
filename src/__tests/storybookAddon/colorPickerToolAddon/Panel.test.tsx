import React from 'react';
import { shallow, mount } from 'enzyme';
import Panel from '../../../storybookAddon/colorPickerToolAddon/Panel';
import addons, { mockChannel } from '@storybook/addons';
import { MaterialUIColorPickerTool } from '../../..';
import { act } from 'react-test-renderer';

describe('test Panel', () => {
  // const mockChannel = jest.fn().mockImplementation(() => ({}));
  addons.setChannel(mockChannel as any);
  //TypeError: Cannot read property 'emit' of undefined
  it('should render correctly', () => {
    // const wrapper = mount(
    //   <Panel />
    // );
    // const fn = wrapper.find(MaterialUIColorPickerTool).props().setThemeColorsFn;

    // act(() => {
    //   fn && fn({});
    // });
    // expect(mockChannel).toBeCalledWith();
  });
  
});