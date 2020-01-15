import React from 'react';
import { shallow, mount } from 'enzyme';
import ColorInput from 'components/common-components/colorPickerTool/ColorInput';
import { TextField } from '@material-ui/core';

describe('test ColorInput', () => {
  it('should render correctly', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <ColorInput onChange={fn} value={''} />
    );
    expect(wrapper.find(TextField)).toHaveLength(1);
  });
});