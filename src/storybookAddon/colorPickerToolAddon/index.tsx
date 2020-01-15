import { makeDecorator, StoryContext } from '@storybook/addons';
import React from 'react';
import { PARAMETER_ID } from './config';
import DecoratorWrapper from './DecoratorWrapper';
import { Theme } from '@material-ui/core';

interface StoryWrapperContext extends StoryContext {
  defaultTheme?: Theme
}
export default makeDecorator({
  name: 'withColorPicker',
  parameterName: PARAMETER_ID,
  wrapper: (storyFn, context: StoryWrapperContext) => {
    return (
      <DecoratorWrapper 
        defaultTheme={context.defaultTheme} 
        childrenFn={storyFn} />
    );
  }
});
