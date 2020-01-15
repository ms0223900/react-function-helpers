import React from 'react';
import { shallow, mount } from 'enzyme';
import DecoratorWrapper from '../../../storybookAddon/colorPickerToolAddon/DecoratorWrapper';
import { MaterialUIColorPickerTool } from '../../../index';

describe('test Panel', () => {
  it('should render correctly', () => {
    const childrenFn = jest.fn().mockImplementation(() => <></>);
    const wrapper = shallow(
      <DecoratorWrapper childrenFn={childrenFn} />
    );
    expect(childrenFn).toBeCalled();
  });
});