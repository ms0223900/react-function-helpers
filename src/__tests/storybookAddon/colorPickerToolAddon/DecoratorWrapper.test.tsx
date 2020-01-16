import React from 'react';
import { shallow, mount } from 'enzyme';
import DecoratorWrapper from '../../../storybookAddon/colorPickerToolAddon/DecoratorWrapper';
import addons, { mockChannel } from '@storybook/addons';
import { EVENT_SET_THEME } from '../../../storybookAddon/colorPickerToolAddon/config';

let SPY_ADDONS: any = undefined;
let mockOn = jest.fn();
let mockRemoveListner = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  SPY_ADDONS = jest.spyOn(addons, 'getChannel').mockImplementation(() => ({
    on: mockOn,
    removeListener: mockRemoveListner,
  }) as any);
});

describe('test Panel', () => {
  const Child = () => <></>;
  addons.setChannel(mockChannel());

  it('should render correctly', () => {
    const wrapper = mount(
      <DecoratorWrapper>
        <Child />
      </DecoratorWrapper>
    );
    
    expect(wrapper.find(Child)).toHaveLength(1);
  });

  it('should connect to channel', () => {
    expect(SPY_ADDONS).not.toBeCalled();
    expect(mockOn).not.toBeCalled();

    const wrapper = mount(
      <DecoratorWrapper>
        <Child />
      </DecoratorWrapper>
    );
    expect(SPY_ADDONS).toBeCalled();
    expect(mockOn).toBeCalledWith(EVENT_SET_THEME, expect.any(Function));
  });
});