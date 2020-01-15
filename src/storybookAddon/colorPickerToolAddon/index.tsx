import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { PARAMETER_ID } from './config';
import DecoratorWrapper from './DecoratorWrapper';

export default makeDecorator({
  name: 'withColorPicker',
  parameterName: PARAMETER_ID,
  wrapper: (storyFn) => {
    return (
      <DecoratorWrapper childrenFn={storyFn} />
    );
  }
});
