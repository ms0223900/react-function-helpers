import { createMuiTheme, Theme } from '@material-ui/core';
import { makeDecorator, StoryContext, useParameter } from '@storybook/addons';
import React from 'react';
import { PARAMETER_ID } from './config';
import DecoratorWrapper from './DecoratorWrapper';

export default makeDecorator({
  name: 'withColorPicker',
  parameterName: PARAMETER_ID,
  wrapper: (storyFn, context) => {
    const params = useParameter(PARAMETER_ID, {
      defaultTheme: createMuiTheme()
    }) as {
      defaultTheme: Theme
    };
    return (
      <DecoratorWrapper 
        defaultTheme={params.defaultTheme}>
        {storyFn(context)}
      </DecoratorWrapper>
    );
  }
});
